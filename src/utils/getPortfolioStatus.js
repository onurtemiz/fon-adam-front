const getPortfolioStatus = (status) => {
  if (status.public) {
    return 'public';
  } else if (status.unlisted) {
    return 'unlisted';
  } else {
    return 'private';
  }
};

export default getPortfolioStatus;
