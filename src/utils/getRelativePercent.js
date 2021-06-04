const getRelativePercent = (current, old) => {
  return (current / old) * 100 - 100;
};

export default getRelativePercent;
