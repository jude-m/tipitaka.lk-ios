import { IOS, dbFileNameDict, dbFileNameFts, platform } from '../constants';

// Initialize variables to null. They will be assigned if the environment is correct.
let CapacitorSQLite = null;
let SQLiteConnection = null;

// Check if running in a browser environment and if the Capacitor global object is available.
if (typeof window !== 'undefined' && window.Capacitor) {
  try {
    // If in a Capacitor environment, attempt to require the sqlite plugin.
    const sqlitePlugin = require('@capacitor-community/sqlite');
    
    CapacitorSQLite = sqlitePlugin.CapacitorSQLite;
    SQLiteConnection = sqlitePlugin.SQLiteConnection;
  } catch (e) {
    console.warn('Capacitor SQLite plugin not available.', e);
  }
}

export const querySqlite = async (type, sql) => {
   if (platform === IOS) {
      if (type === 'fts') {
         try {
            const sqliteFtsConn = new SQLiteConnection(CapacitorSQLite);
            const dbFts = await sqliteFtsConn.createConnection(dbFileNameFts, false, 'no-encryption', 1);

            await dbFts.open();
            console.log("query>> " + sql);
            const result = await dbFts.query(sql);
            await dbFts.close();
            await sqliteFtsConn.closeConnection(dbFileNameFts);
            return result.values;
         } catch (error) {
            console.error(`Error querying ${type} database: ${error.message}`, error);
            return null;
         }
      }
      else if (type === 'dict') {
         try {
            const sqliteDictConn = new SQLiteConnection(CapacitorSQLite);
            const dbDict = await sqliteDictConn.createConnection(dbFileNameDict, false, 'no-encryption', 1);

            await dbDict.open(); 
            console.log("query>> " + sql);
            const result = await dbDict.query(sql);
            
            console.log("Result>> ");
            result.values.forEach((row) => {
               console.log(row);
            });
            
            await dbDict.close();
            await sqliteDictConn.closeConnection(dbFileNameDict);
            return result.values;
         } catch (error) {
            console.error(`Error querying ${type} database: ${error.message}`, error);
            return null;
         }
      }
   }
}

