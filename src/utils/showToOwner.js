const showToOwner = (item, user) => {
  return item.owner === user?.uid;
};

export default showToOwner;
