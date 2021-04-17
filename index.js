// required dependencies
const inquirer = require('inquirer');
const conTable = require('console.table');
const connection = require('./config/connection');

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
            'Delete an employee',
            'Exit'
        ]

    }).then(response => {
        switch (response.action) {
            case 'Add a department':
                addDeptInfo()
                break;

            case 'Add a role':
                addRoleInfo();
                break;

            case 'Add an employee':
                addEmployeeInfo();
                break;

            case 'View all departments':
                connection.query('SELECT * FROM department', (err, results) => {
                    console.table(results)
                    start();
                });
                break;

            case 'View all roles':
                connection.query('SELECT * FROM role', (err, results) => {
                    console.table(results)
                    start();
                });
                break;

            case 'View all employees':
                connection.query('Select * FROM employee', (err, results) => {
                    console.table(results)
                    start();
                });
                break;

            case 'Update an employee\'s role':
                console.log("update")
                updateEmployeeInfo();
                break;

            case 'Delete an employee':
                    deleteEmployee();
                    break;

            case 'Exit':
                connection.end();
                process.exit();
                break;
        }
    })
}

// Add a department question
const addDeptInfo = () => {
    inquirer.prompt({
        name: 'deptName',
        type: 'input',
        message: 'What is the name of the new department?'
    }).then(answers => {
        connection.query('INSERT INTO department SET ?', { name: answers.deptName }, (err, results) => {
            console.log('Department has been added')
            start();
        })
    })
}

// Add a role
const addRoleInfo = () => {
    connection.query('SELECT * FROM department', (err, deptResults) => {
        const departmentChoices = deptResults.map(({ id, name }) => ({ name: name, value: id }));
        console.log(departmentChoices)
        inquirer.prompt([
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
                name: 'dept_id',
                type: 'list',
                message: 'Which department does this role report to?',
                choices: departmentChoices
            }
        ]).then(answers => {
            console.log(answers)
            connection.query('INSERT INTO role SET ?', { title: answers.roleName, salary: answers.salary, dept_id: answers.dept_id }, (err, results) => {
                console.log('Role has been added')
                start();
            })
        })
    })
}

// Add an employee
const addEmployeeInfo = () => {
    connection.query('SELECT * FROM role', (err, roleResults) => {
        const roleChoices = roleResults.map(({ id, title }) => ({ name: title, value: id }));
        console.log(roleChoices)

        connection.query('SELECT * FROM employee', (err, employeeResults) => {
            const managerChoices = employeeResults.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));
            managerChoices.push({ name: "none", value: null })
            console.log(managerChoices)
            inquirer.prompt([
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
                    choices: roleChoices
                },

                {
                    name: 'manager',
                    type: 'list',
                    message: 'Who is the employee\'s manager?',
                    choices: managerChoices
                }
            ]).then(answers => {
                connection.query('INSERT INTO employee SET ?', { first_name: answers.firstName, last_name: answers.lastName, role_id: answers.role, manager_id: answers.manager }, (err, results) => {
                    console.log('Employee has been added')
                    start()
                })
            })
        }) // closing for employee 
    }); //role 
}

// Update an employee's role
const updateEmployeeInfo = () => {
    connection.query('SELECT * FROM employee', (err, employeeResults) => {
        const employeeChoices = employeeResults.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));
        console.log(employeeChoices)
        inquirer.prompt(
            {
                name: 'updatename',
                type: 'list',
                message: 'Which employee\'s role would you like to update?',
                choices: employeeChoices
            }
        ).then(answers => {
            console.log('updating role for selected employee', answers.updatename)
            connection.query('SELECT * FROM role', (err, roleResults) => {
                const roleChoices = roleResults.map(({ id, title }) => ({ name: title, value: id }));
                console.log(roleChoices)

                inquirer.prompt(
                    {
                        name: 'newrole',
                        type: 'list',
                        message: 'Please select the employee\'s new role.',
                        choices: roleChoices
                    }
                ).then(updatedRole => {
                    console.log('new role for selected employee', updatedRole.newrole)
                    connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [updatedRole.newrole, answers.updatename], (err, results) => {
                    console.table(results)
                    start();
                    });
                });
            });
        })
    })

}

// Delete an employee
const deleteEmployee = () => {
    connection.query('SELECT * FROM employee', (err, employeeResults) => {
        const employeeChoices = employeeResults.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));
        console.log(employeeChoices)
        inquirer.prompt(
            {
                name: 'deletedEmployee',
                type: 'list',
                message: 'Which employee would you like to delete?',
                choices: employeeChoices
            }
        ).then(answers => {
            connection.query('DELETE FROM employee WHERE id = ?', answers.deletedEmployee, (err, deletedEmployee) => {
                console.log('Successfully removed employee')
                start();
            });
        });
    });
}

connection.connect(err => {
    if (err) throw err;
    start();
})