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

  const addItem = () => {
    inquirer
      .prompt({
        name: 'action',
        type: 'rawlist',
        message: 'Please select an item to add:',
        choices: [
          'Department',
          'Role',
          'Employee',
          'Main menu',
        ],
      })
      .then((answer) => {
        switch (answer.action) {
            case 'Department':
                addDepartment();
            break;
      
            case 'Role':
                addRole();
            break;
      
            case 'Employee':
                addEmployee();
            break;
      
            case 'Main menu':
                init();
            break;
      
            default:
                console.log('Not a valid option.');
            break;  
        }

    });
};

const addDepartment = () => {
    inquirer
        .prompt({
            name: 'department',
            input: 'input',
            message: "Enter new department's name."
        }
    ).then
}


const addRole = () => {
    inquirer
        .prompt(
            [
                {
                name: 'roleTitle',
                input: 'input',
                message: "Enter new role."
                },
                {
                name: 'roleSalary',
                input: 'input',
                message: "Enter new salary."
                },
                {
                name: 'roleDepartment',
                input: 'input',
                message: "Enter department ID."
                },
            ]
        ).then
}

const addEmployee = () => {
    inquirer
        .prompt(
            [
              {
                name: 'firstName',
                input: 'input',
                message: "Enter new employee's first name."
              },
              {
              name: 'lastName',
              input: 'input',
              message: "Enter new employee's last name."
              },
              {
                name: 'roleID',
                input: 'input',
                message: "Enter new employee's ID number."
              },
              {
                name: 'managerID',
                input: 'input',
                message: "Enter the manager ID of the new employee."
              },
        ]
    ).then

}