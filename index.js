// required dependencies
const inquirer = require('inquirer');
const mysql = require('mysql')
const conTable = require('console.table');

// Connection to Database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    password: '',
    database: 'cms_db',
});

// Inquirer prompts
// Choose your own adventure
const start = () => {
    inquirer.prompt ({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'Add a department',
            'Add a role',
            'Add an employee',
            'View all departments',
            'View all roles',
            'View all employees',
            'Update an employee\'s role',
            'Exit'
        ]

    }).then //switch case statement
}

// Add a department question
const addDeptInfo = () => {
    return inquirer.prompt ({
        name: 'deptName',
        type: 'input',
        message: 'What is the name of the new department?'
    })
}

// Add a role
const addRoleInfo = () => {
    inquirer.prompt ([
        {
        name: 'roleName',
        type: 'input',
        message: 'What is the title of the new role?'
    },

    {
        name: 'salary',
        type: 'input',
        message: 'What is the salary for the new role?'
    },

    {
        name: 'deptName',
        type: 'list',
        message: 'Which department does this role report to?',
        choices: [
            ...department
        ]
    }
    ])
}

// Add an employee
const addEmployeeInfo = () => {
    inquirer.prompt ([
        {
            name: 'firstName',
            type: 'input',
            message: 'What is the employee\'s first name?'
        },

        {
            name: 'lastName',
            type: 'input',
            message: 'What is the employee\'s last name?'
        },

        {
            name: 'role',
            type: 'list',
            message: 'What is the employee\'s role?',
            choices: [
                ...role
            ]
        },

        {
            name: 'manager',
            type: 'list',
            message: 'Who is the employee\'s manager?',
            choices: [
                ...managers
            ]
        }
    ])
}

