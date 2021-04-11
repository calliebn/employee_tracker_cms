// required dependencies
const inquirer = require('inquirer');
const mysql = require('mysql')
const conTable = require('console.table');

// Connection to Database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    password: '',
    database: '',
});