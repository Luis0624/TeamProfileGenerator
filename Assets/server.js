const mysql = require('mysql');
const inquirer = require('inquirer');
const { username, passowrd } = require("./config");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: username,
    password: password,
    database: "employer_DB",
  });
  
  connection.connect((err) => {
    if (err) throw err;
    init();
  });