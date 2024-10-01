const checkConnection = (db) => {
  if (db === null) throw new Error("no db connection");
};

module.exports = {
  checkConnection,
};
