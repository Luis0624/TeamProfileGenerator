const mysql = require('mysql');
const inquirer = require('inquirer');
const { username, password } = require("./config");

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
    ).then((answer) => {
        console.log('Adding new department...');
        connection.query(
          'INSERT INTO department SET ?',
          {name: answer.department},
          (err, res) => {
            if (err) throw err;
            console.log("Success!");
            init();
          })
    })
};


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
        ).then((answer) => {
            console.log('Adding new role...');
            connection.query(
              'INSERT INTO role SET ?',
              {
                title: answer.roleTitle,
                salary: answer.roleSalary,
                department_id: answer.roleDepartment,
        
              },
              (err, res) => {
                if (err) throw err;
                console.log('Success!');
                init();
              }
            )
        }
    )
};
        
        

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
    ).then((answer) => {
        console.log('Success!');
        connection.query(
          'INSERT INTO employee SET ?',
          {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: answer.roleID,
            manager_id: answer.managerID,
    
          },
          (err, res) => {
            if (err) throw err;
            console.log('Success!');
            init();
          }
        )
    })
};

const viewItem = () => {
    inquirer
      .prompt({
        name: 'action',
        type: 'rawlist',
        message: 'Please select an item:',
        choices: [
          'Departments',
          'Roles',
          'Employees',
          'Main Menu',
        ],
      })
      .then((answer) => {
        switch (answer.action) {
          case 'Departments':
            viewDepartment();
            break;
  
          case 'Roles':
            viewRole();
            break;
  
          case 'Employees':
            viewEmployee();
            break;
  
          case 'Main Menu':
            init();
            break;
  
          default:
            console.log("Not a valid option.");
            break;
        }
    });
};
  
          const viewDepartment = () => {
            console.log("Quering Data...")
            connection.query('SELECT * FROM department', (err, res) => {
              if (err) throw err;
              console.table(res);
            })
            viewItem();
          };
  
  
  
          const viewRole = () => {
            console.log("Quering Data....")
            connection.query('SELECT * FROM role', (err, res) => {
              if (err) throw err;
              console.table(res);
            })
            viewItem();
          };
  
  
  
          const viewEmployee = () => {
            console.log("Quering Data...")
            connection.query('SELECT * FROM employee', (err, res) => {
              if (err) throw err;
              console.table(res);
            })
            viewItem();
          };
  
  
  
  const updateEmployee = () => {
    inquirer
    .prompt(
              [
                {
                  name: 'employeeID',
                  input: 'input',
                  message: "Enter new ID number of employee."
                },
                {
                name: 'roleUpdate',
                input: 'input',
                message: "Enter new role ID of employee."
                },
              ]).then((answer) => {
              console.log('Updating employee role...');
              const query = connection.query(
                'UPDATE employee SET ? WHERE ?',
                [
                  {
                    role_id: answer.roleUpdate
                  },
                  {
                    id: answer.employeeID,
                  },
                ],
                (err, res) => {
                  if (err) throw err;
                  console.log("Success! Employee has been updated!");
  
                 init();
            }
        );
    })
};
  
  
  const deleteItem = () => {
    inquirer
      .prompt({
        name: 'action',
        type: 'rawlist',
        message: 'Please select an item to delete:',
        choices: [
          'Department',
          'Role',
          'Employee',
          'Return to main menu',
        ],
    })
      .then((answer) => {
        switch (answer.action) {
          case 'Department':
            deleteDepartment();
            break;
  
          case 'Role':
            deleteRole();
            break;
  
          case 'Employee':
            deleteEmployee();
            break;
  
          case 'Return to main menu':
            init();
            break;
  
          default:
            console.log('Not a valid option.');
            break;
        }
      });
    };
  
    const deleteDepartment = () => {
      inquirer
      .prompt(
                [
                  {
                    name: 'departmentDelete',
                    input: 'input',
                    message: "Enter name of department you want to delete."
                  },
                ]).then((answer) => {
                console.log('Deleting department...');
                const query = connection.query(
                  `DELETE FROM department WHERE name = '${answer.departmentDelete}'`,
                  (err, res) => {
                    if (err) throw err;
                    console.log("Success! Department has been removed.");
  
                   init();
                }
            );
        })
    };
  
    const deleteRole = () => {
      inquirer
      .prompt(
                [
                  {
                    name: 'roleDelete',
                    input: 'input',
                    message: "Enter title of the role you want to delete."
                  },
                ]).then((answer) => {
                console.log('Deleting role...');
                const query = connection.query(
                  `DELETE FROM role WHERE title = '${answer.roleDelete}'`,
                  (err, res) => {
                    if (err) throw err;
                    console.log("Success! Role has been removed.");
  
                   init();
                }
            );
        })
    };
  
  const deleteEmployee = () => {
    inquirer
    .prompt(
              [
                {
                  name: 'employeeDelete',
                  input: 'input',
                  message: "Enter the first name of the Employee you want to delete."
                },
              ]).then((answer) => {
              console.log('Deleting employee...');
              const query = connection.query(
                `DELETE FROM employee WHERE first_name = '${answer.employeeDelete}'`,
                (err, res) => {
                  if (err) throw err;
                  console.log("Success! Employee has been removed.");
  
                 init();
              }
          );
      })
  };
  
  const init = () => {
    inquirer
      .prompt({
        name: 'action',
        type: 'rawlist',
        message: 'Please select one of the following options:',
        choices: [
          'Add department, role, or employee',
          'View departments, roles, or employees',
          'Update employee roles',
          'Delete departments, roles, and employees',
          'Quit Application',
        ],
      })
      .then((answer) => {
        switch (answer.action) {
          case 'Add department, role, or employee':
            addItem();
            break;
  
          case 'View departments, roles, or employees':
            viewItem();
            break;
  
          case 'Delete departments, roles, and employees':
            deleteItem();
            break;
  
          case 'Update employee roles':
            updateEmployee();
            break;
  
          case 'Quit Application':
            connection.end();
            break;
  
          default:
            console.log("Not a valid option.");
            break;
         }
    });
};