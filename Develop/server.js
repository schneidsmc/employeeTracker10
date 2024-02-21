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
      user: 'root',
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
      promptUser();
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

  
const promptUser = async () => {
  try{
    let answer = await inquirer.prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices:  [
        'View ALL Employees',
        'View ALL Departments',
        'View ALL Roles',
        'Add Department',
        'Add Role',
        'Add Employee',
        'Update Employee Role',
        'Exit'
      ]
    })
    .then((answers) => {
      const {choices} = answers;
      if (choices === 'View ALL Employees') {
        employeeView();
      }
      if (choices === 'View ALL Departments') {
        departmentView();
      }  
      if (choices === 'View ALL Roles') {
        roleView();
      }   
      if (choices === 'Add Department') {
        departmentAdd();
      }   
      if (choices === 'Add Role') {
        roleAdd();
      } 
      if (choices === 'Add Employee') {
        employeeAdd();
      }
      if (choices === 'Update Employee Role') {
        employeeUpdate();
      }
      if (choices === 'Exit') {
        connection.end();
      }
    })
  } catch (err) {
    console.log(err);
    promptUser();
  }
};

// employeeView();
// departmentView();
// roleView();
// departmentAdd();
// roleAdd();
// employeeAdd();
// employeeUpdate();