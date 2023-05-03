/*
 
*/
const mysql = require('mysql');


const connectToDataBase = (databaseName, prefixMessage="") => {
  // This connects to the mysql database.
  let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    database: databaseName
  });

  // This callback function is executed after a connection attempt.
  connection.connect(function(err) {
    if (err) {
      console.error(err);
    } else {
      console.log(prefixMessage+"connected to mySQL database!");
    }
  });

  return connection;
};

const insertRecord = (connection, tableName, record) => {
  let promise = new Promise((resolve, reject) => {
    connection.query('INSERT INTO ?? SET ?', [tableName, record], (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(true);
      }
    });
  });
  return promise
}

const updateRecord = (connection, tableName, record, id) => {
  let promise = new Promise((resolve, reject) => {
    connection.query('UPDATE ?? SET ? WHERE ?', [tableName, record, id], (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
  return promise;
}

const deleteRecord = (connection, tableName, id) => {
  let promise = new Promise((resolve, reject) => {
    connection.query('DELETE FROM ?? WHERE ?', [tableName, id], (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
  return promise;
}

const getRecordElement = (connection, tableName, field, id) => {
  let promise = new Promise((resolve, reject) => {
    connection.query('SELECT ?? FROM ?? WHERE ?', [field, tableName, id], (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
  return promise;
}

const truncateTable = (connection, tableName) => {
  let promise = new Promise((resolve, reject) => {
    connection.query('TRUNCATE ??', [tableName], (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
  return promise;
}

const getRecordByCondition = (connection, tableName, fields, condition, searchValues) => {
  const promise = new Promise((resolve, reject) => {
    connection.query(`SELECT ?? FROM ?? WHERE ${condition}`, [fields, tableName, ...searchValues], (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
  return promise;
};

const getFirstRecord = (connection, tableName, id) => {
  let promise = new Promise((resolve, reject) => {
    connection.query('SELECT * FROM ?? WHERE ? LIMIT 1', [tableName, id], (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
  return promise;
}

const getRecordCount = (connection, tableName, id) => { 
  let promise = new Promise((resolve, reject) => {
    connection.query('SELECT * FROM ?? WHERE ?', [tableName, id], (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.length);
      }
    });
  });
  return promise;
};

const disconnect = (connection) => {
  connection.end(() => {
    console.log('Disconnected to MySQL server.')
  });
};

// Specify functions ready for export.
module.exports = {
  connectToDataBase,
  disconnect,
  insertRecord,
  updateRecord,
  deleteRecord,
  truncateTable,
  getRecordElement,
  getRecordByCondition,
  getFirstRecord,
  getRecordCount,
};