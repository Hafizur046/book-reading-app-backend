function removeSession({ store }) {
  return async (req, res) => {
    console.log(store.all());
    res.json();
  };
}

module.exports = removeSession;
