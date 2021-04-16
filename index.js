// required dependencies
const inquirer = require('inquirer');
const conTable = require('console.table');
const connection = require('./config/connection');


// Table variables
// const department = console.table(results);
// const role = console.table(results);
// const employee = console.table(results);

// Inquirer prompts
// Choose your own adventure
const start = () => {
    console.log('Welcome to the employee cms')
    inquirer.prompt({
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

    }).then(response => {
        switch (response.action) {
            case 'Add a department':
                newDepartment = addDeptInfo();
                break;

            case 'Add a role':
                newRole = addRoleInfo();
                break;

            case 'Add an employee':
                newEmployee = addEmployeeInfo();
                break;

            case 'View all departments':
                connection.query('SELECT * FROM department', (err, results) => {
                    console.table(results)
                });
                break;

            case 'View all roles':
                connection.query('SELECT * FROM role', (err, results) => {
                    console.table(results)
                });
                break;

            case 'View all employees':
                connection.query('Select * FROM employee', (err, results) => {
                    console.table(results)
                });
                break;

            case 'Update and employee\'s role':
                updateRole = updateEmployeeInfo();
                connection.query('UPDATE employee SET role_id WHERE ?', (err, results) => {
                    console.table(results)
                });
                break;

            case 'Exit':
                connection.end();
                break;
        }
    })
}

// Add a department question
const addDeptInfo = () => {
    return inquirer.prompt({
        name: 'deptName',
        type: 'input',
        message: 'What is the name of the new department?'
    })
}

// Add a role
const addRoleInfo = () => {
    return inquirer.prompt([
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
   return inquirer.prompt([
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

// Update an employee's role
const updateEmployeeInfo = () => {
    return inquirer.prompt([
        {
            name: 'updatename',
            type: 'list',
            message: 'Which employee\'s role would you like to update?',
            choices: [
                ...employee
            ]
        },

        {
            name: 'updaterole',
            type: 'input',
            message: 'What is their new role?'
        }
    ])
}

connection.connect(err => {
    if (err) throw err;
    start();
})