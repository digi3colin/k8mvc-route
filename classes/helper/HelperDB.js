const Database  = require('better-sqlite3');
const K8 = require('k8mvc');

class HelperDB {
  static getConnection(hostname){
    if(!K8.config.cache.database || !HelperDB.pool[hostname]){
      const dbPath = `${K8.APP_PATH}/../../sites/${hostname}/db/db.sqlite`;
      const db = new Database(dbPath);
//      db.pragma('journal_mode = WAL');

      HelperDB.pool[hostname] = {
        connection : db,
        access_at : Date.now()
      };
    }

    HelperDB.pool[hostname].access_at = Date.now();
    return HelperDB.pool[hostname].connection;
  }
}

HelperDB.pool = [];

module.exports = HelperDB;