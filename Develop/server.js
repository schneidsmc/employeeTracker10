const fs = require('fs')
const path = require('path')
const mysql = require('mysql2')
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'Root',
      database: 'CMS_db'
    })

    db.connect(err =>{
      if (err) throw err;
      console.log(`Connected to the CMS_db database.`);
      afterConnection()
    })
  
    afterConnection = () => {
      console.log("***********************************")
      console.log("*                                 *")
      console.log("*        EMPLOYEE MANAGER         *")
      console.log("*                                 *")
      console.log("***********************************")
      // promptUser();
    };
  // view all employees
  // view all departments
  // view all roles
  // add a department
  // add a role
  // add an employee
  // update employee role
  // **update employee manager
  // **view employees by manager
  // **delete departments, roles and employees
  // **View salary budget SUM of Salaries

  
// const promptUser = async () => {
//   try{
//     let answer = await inquirer.prompt({
//       name: 'action',
//       type: 'list',
//       message: 'What would you like to do?',
//       choices:  [
//         'View ALL Employees',
//         'View ALL Departments',
//         'View ALL Roles',
//         'Add Department',
//         'Add Role',
//         'Add Employee',
//         'Update Employee Role',
//         'Exit'
//       ]
//     });
//     switch (answer.action) {
//       case 'View ALL Employees':
//         employeeView();
//         break;

//       case 'View ALL Departments':
//         departmentView();
//         break;

//       case 'View ALL Roles':
//         roleView();
//         break;

//       case 'Add Department':
//         departmentAdd();
//         break;

//       case 'Add Role':
//         roleAdd();
//         break;

//       case 'Add Employee':
//         employeeAdd();
//         break;

//       case 'Update Employee Role':
//         employeeUpdate();
//         break;

//       case 'Exit':
//         connection.end();
//         break;
//     };
//   } catch (err) {
//     console.log(err);
//     promptUser();
//   }
// };

// employeeView();
// departmentView();
// roleView();
// departmentAdd();
// roleAdd();
// employeeAdd();
// employeeUpdate();