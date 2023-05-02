/*
 
*/
const mysql = require('mysql');


const connectToDataBase = (databaseName) => {
  // This connects to the mysql database.
  const connection = mysql.createConnection({
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
      console.log("Connected to mySQL database!");
    }
  });

  return connection;
};

const insertRecord = (connection, tableName, record) => {
  const promise = new Promise((resolve, reject) => {
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
const updateRecord = (connection, tableName, recordId, record) => {
  //
}
const deleteRecord = (connection, tableName, recordId) => {
  //
}
const getRecordElement = (connection, tableName, field, unique_id, filter) => {
  const promise = new Promise((resolve, reject) => {
    connection.query('SELECT ?? FROM ?? WHERE ?', [field, tableName, unique_id], (error, results, fields) => {
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
  getRecordElement,
  getRecordByCondition
};