importScripts('https://momentjs.com/downloads/moment.min.js');

onmessage = (e) => {
  try {
    const { comparisons, stacks, portfolioHistory } = e.data;
    const { comparisonsHistories, comparisonsNetHistories } =
      calculateComparisons(comparisons, stacks, portfolioHistory);
    postMessage({ comparisonsHistories, comparisonsNetHistories });
  } catch (error) {
    postMessage({ error: true });
  }
};

const calculateComparisons = (comparisons, stacks, portfolioHistory) => {
  const comparisonsHistories = comparisons.map((comparison) =>
    getComparisonHistory(comparison, stacks, portfolioHistory)
  );
  const comparisonsNetHistories = comparisonsHistories.map((comparison) =>
    getComparisonNetHistory(comparison, stacks)
  );
  return { comparisonsHistories, comparisonsNetHistories };
};

const getComparisonHistory = (comparison, stacks, portfolioHistory) => {
  let comparisonHist = comparison.history.map((hist) => {
    return { ...hist, category: comparison.title };
  });

  stacks.forEach((stack) =>
    stack.purchases.forEach((purchase) => {
      const purchaseDay = purchase.history[0];
      const comparisonDay = comparisonHist.find((h) =>
        moment(h.date).isSame(purchaseDay.date, 'day')
      );
      if (comparisonDay) {
        const pieces = purchaseDay.value / comparisonDay.price;
        comparisonHist = comparisonHist.map((hist) =>
          moment(hist.date).isSameOrAfter(purchase.date, 'day')
            ? {
                ...hist,
                pieces: hist.pieces ? hist.pieces + pieces : pieces,
              }
            : hist
        );
      }
    })
  );

  comparisonHist = comparisonHist
    .filter((h) =>
      portfolioHistory.find((hist) => moment(hist.date).isSame(h.date, 'day'))
    )
    .map((hist) => {
      return { ...hist, value: hist.pieces * hist.price };
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return comparisonHist;
};

const getComparisonNetHistory = (comparisonHistory, stacks) => {
  let comparisonNetHist = comparisonHistory;

  stacks.forEach((stack) =>
    stack.purchases.forEach((purchase) => {
      const purchaseDay = purchase.history[0];
      const comparisonDay = comparisonNetHist.find((h) =>
        moment(h.date).isSame(moment(purchaseDay.date).toISOString(), 'day')
      );

      if (comparisonDay) {
        comparisonNetHist = comparisonNetHist.map((hist) =>
          moment(hist.date).isSameOrAfter(purchase.date, 'day')
            ? {
                ...hist,
                value: hist.value - comparisonDay.value,
              }
            : hist
        );
      }
    })
  );

  return comparisonNetHist;
};
