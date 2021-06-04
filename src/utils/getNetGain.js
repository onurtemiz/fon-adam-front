const getNetGain = (history, purchases) => {
  const initialHistories = purchases
    .map((purchase) => {
      return { ...purchase.history[0], fundCode: purchase.code };
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const netGainHistory = history.map((dailyAmount) => {
    const addedAmount = initialHistories.reduce((acc, initialHistory) => {
      if (new Date(initialHistory.date) <= new Date(dailyAmount.date)) {
        return acc + initialHistory.price;
      } else {
        return acc;
      }
    }, 0);

    return { ...dailyAmount, price: dailyAmount.price - addedAmount };
  });
  return netGainHistory;
};

export default getNetGain;
