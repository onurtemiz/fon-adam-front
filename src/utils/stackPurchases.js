import moment from 'moment';
import getRelativePercent from './getRelativePercent';

export const stackFunds = (purchases) => {
  const groupedFunds = purchases.reduce((groups, item) => {
    const group = groups.find((group) => group._id === item.fund._id);

    if (group) {
      group.value += item.history[item.history.length - 1].price * item.pieces;
      group.purchases.push(item);
    } else {
      const group = { ...item.fund };
      group.value = item.history[item.history.length - 1].price * item.pieces;
      group.purchases = [item];
      groups.push(group);
    }

    return groups;
  }, []);

  return groupedFunds.map((group) => {
    return { ...group, value: +group.value.toFixed(2) };
  });
};

export const getStackFundPieces = (stack) => {
  stack.pieces = stack.purchases.reduce(
    (curr, purchase) => (curr += purchase.pieces),
    0
  );
  return stack;
};

export const stackSameFundPurchases = (fund) => {
  let stackedHistory = fund.purchases.reduce((history, purchase) => {
    purchase.history.forEach((hist) => {
      const foundHistory = history.find((pInfo) => pInfo.date === hist.date);
      if (foundHistory) {
        foundHistory.value += hist.value;
      } else {
        history.push({ value: hist.value, date: hist.date });
      }
    });

    return history;
  }, []);

  stackedHistory = stackedHistory
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((h) => {
      return { ...h, value: +h.value.toFixed(2) };
    });

  fund.history = stackedHistory;

  return fund;
};

export const getStackFundNetHistory = (fund) => {
  let netHistory = fund.history;

  fund.purchases.forEach((purchase) => {
    const initialHist = purchase.history[0];

    netHistory = netHistory.map((hist) =>
      moment(initialHist.date).isSameOrBefore(hist.date)
        ? { ...hist, value: hist.value - initialHist.value }
        : hist
    );
  });

  fund.netHistory = netHistory;

  return fund;
};

export const getStackFundStatistics = (fund) => {
  fund.purchases = fund.purchases.map((purchase) => {
    return {
      ...purchase,
      statistics: getHistoryStatistics(purchase.history),
    };
  });

  fund.statistics = getFundStatistics(fund);
  return fund;
};

const getHistoryStatistics = (history) => {
  const periods = ['day', 'week', 'month', 'year', 'years'].map((period) => {
    const periodHistory = history.filter((hist) =>
      moment(hist.date).isSameOrAfter(
        moment()
          .startOf('day')
          .subtract(period === 'years' ? 15 : 1, period),
        'day'
      )
    );

    // getting the first and the last hist
    return [
      periodHistory[periodHistory.length - 1]?.value ?? 0,
      periodHistory[0]?.value ?? 0,
    ];
  });
  const statistics = {
    currentValue: history[history.length - 1].value,
    boughtValue: history[0].value,
    lastDay: getRelativePercent(periods[0][0], periods[0][1]),
    lastWeek: getRelativePercent(periods[1][0], periods[1][1]),
    lastMonth: getRelativePercent(periods[2][0], periods[2][1]),
    lastYear: getRelativePercent(periods[3][0], periods[3][1]),
    allTime: getRelativePercent(periods[4][0], periods[4][1]),
  };

  return statistics;
};

const getFundStatistics = (fund) => {
  const periods = ['day', 'week', 'month', 'year', 'years'].map((period) => {
    const periodHistories = fund.purchases.map((purchase) =>
      purchase.history.filter((hist) =>
        moment(hist.date).isSameOrAfter(
          moment()
            .startOf('day')
            .subtract(period === 'years' ? 15 : 1, period),
          'day'
        )
      )
    );

    const boughtAndCurrentValues = periodHistories.reduce(
      (curr, history) => {
        curr[0] = curr[0] + history[history.length - 1]?.value ?? 0;
        curr[1] = curr[1] + history[0]?.value ?? 0;
        return curr;
      },
      [0, 0]
    );

    // getting the first and the last hist
    return [
      boughtAndCurrentValues[0],
      boughtAndCurrentValues[boughtAndCurrentValues.length - 1],
    ];
  });

  const boughtAndCurrentValues = fund.purchases.reduce(
    (curr, purchase) => {
      curr[0] = curr[0] + purchase.history[purchase.history.length - 1].value;
      curr[1] = curr[1] + purchase.history[0].value;
      return curr;
    },
    [0, 0]
  );

  const statistics = {
    currentValue: boughtAndCurrentValues[0],
    boughtValue: boughtAndCurrentValues[1],
    lastDay: getRelativePercent(periods[0][0], periods[0][1]),
    lastWeek: getRelativePercent(periods[1][0], periods[1][1]),
    lastMonth: getRelativePercent(periods[2][0], periods[2][1]),
    lastYear: getRelativePercent(periods[3][0], periods[3][1]),
    allTime: getRelativePercent(periods[4][0], periods[4][1]),
  };

  return statistics;
};

export default { stackFunds, stackSameFundPurchases };
