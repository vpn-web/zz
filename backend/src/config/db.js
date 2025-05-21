const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('usage.json');
const db = low(adapter);
(async () => {
  await db.read();
  db.data ||= { users: {}, projects: [] };
  await db.write();
})();
module.exports = db;
