const fs = require('fs')
const path = require('path')
const mysql = require('mysql2')
const express = require('express');
const chalk = require('chalk');
// import chalk from 'chalk';
const PORT = process.env.PORT || 3001;
const app = express();
const inquirer = require('inquirer');
const err = chalk.bold.red;

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
      console.log(chalk.bgGreen.bold("*****************************"))
      console.log(chalk.bgGreen.bold("*                           *"))
      console.log(chalk.bgGreen.bold("*     EMPLOYEE MANAGER      *"))
      console.log(chalk.bgGreen.bold("*                           *"))
      console.log(chalk.bgGreen.bold("*****************************"))
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
  try {
    const answer = await inquirer.prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View Department Budget',
        'View ALL Employees',
        'View ALL Departments',
        'View ALL Roles',
        'Add Department',
        'Add Role',
        'Add Employee',
        'Update Employee Role',
        'Exit'
      ]
    });

    const { action } = answer;

    switch (action) {
      case 'View ALL Employees':
        await employeeView();
        break;
      case 'View ALL Departments':
        await departmentView();
        break;
      case 'View ALL Roles':
        await roleView();
        break;
      case 'Add Department':
        await departmentAdd();
        break;
      case 'Add Role':
        await roleAdd();
        break;
      case 'Add Employee':
        await employeeAdd();
        break;
      case 'Update Employee Role':
        await employeeUpdate();
        break;
      case 'View Department Budget':
        await viewBudget();
        break;
      case 'Exit':
        db.end((err) => {
          if (err) {
            console.error('Error closing the database connection:', err);
          } else {
            console.log(chalk.bgMagenta.bold('BYE!'));
          }
        });
    }
  } catch (err) {
    
    console.error('Error:', err);
    // Handle errors appropriately, such as retrying the prompt
    promptUser();
  }
};

// employeeView();
employeeView = async () => {
  console.log(chalk.bold.black.bgCyan('Showing all employees ...\n'));
  const sql = `SELECT employee.id,
                employee.first_name,
                employee.last_name,
                roles.title,
                department.department_name AS department,
                roles.salary
            FROM employee
                LEFT JOIN roles ON employee.role_id = roles.id
                LEFT JOIN department ON roles.department_id = department.id`;
  try {
    const [rows, fields] = await db.promise().query(sql);
    console.table(rows);
  } catch (error) {
    console.error('Error fetching employees', error)
  }
  promptUser();
}
// departmentView();
departmentView = async () => {
  console.log(chalk.bold.black.bgCyan('Showing all departments ...\n'));
  const sql = `SELECT department.id AS id, department.department_name AS department FROM department`;
  try {
    const [rows, fields] = await db.promise().query(sql);
    console.table(rows);
  } catch (error) {
    console.error('Error fetching departments', error)
  }
  promptUser();
}

// roleView();
roleView = async () => {
  console.log(chalk.bold.black.bgCyan('Showing all roles ...\n'));
  const sql = `SELECT roles.id AS id, roles.title AS Role FROM roles`;
  try {
    const [rows, fields] = await db.promise().query(sql);
    console.table(rows);
  } catch (error) {
    console.error('Error fetching roles', error)
  }
  promptUser();
}

// departmentAdd();

departmentAdd = async () => {
  try {
    const answer = await inquirer.prompt([
      {
        type: 'input',
        name: 'addDept',
        message: 'What department would you like to add?',
        validate: addDept => {
          if (addDept) {
            return true;
          } else {
            console.log('Please enter a department.');
            return false;
          }
        }
      },
    
    ])
  
  const sql = `INSERT INTO department (department_name)
                VALUES (?)`;
  await db.promise().query(sql, answer.addDept);
  console.log(`Added ${answer.addDept} to departments!`);

  await departmentView();
} catch (error) {
console.log(`Error adding to departments`, error);
}
};

// roleAdd();

roleAdd = async () => {
  try {
    const answer = await inquirer.prompt([
      {
        type: 'input',
        name: 'addRole',
        message: 'What role would you like to add?',
        validate: addRole => {
          if (addRole) {
            return true;
          } else {
            console.log('Please enter a role.');
            return false;
          }
        }
      },
        {
        type: 'input',
        name: 'addSalary',
        message: 'What is the salary for this role?',
        validate: addSalary => {
          if (addSalary) {
            return true;
          } else {
            console.log('PLease enter a salary.');
            return false;
          }
        }
      }
    ]);

    const params = [answer.addRole, answer.addSalary];
    const roleSQL = `SELECT department_name, id FROM department`;
    const [data, fields] = await db.promise().query(roleSQL);
    const dept = data.map(({department_name, id}) => ({name: department_name, value: id}));
    const deptChoice = await inquirer.prompt([
      {
      type: 'list',
      name: 'dept',
      message: "What department is this role in?",
      choices: dept
      }
    ]);

    const selectedDept = deptChoice.dept;
    params.push(selectedDept);
  const sql = `INSERT INTO roles (title, salary, department_id)
                VALUES (?, ?, ?)`;
  await db.promise().query(sql, params);
  console.log(`Added ${answer.addRole} to roles!`);
  await roleView();
} catch (error) {
console.log(`Error adding to roles`, error);
}
};

employeeAdd = async () => {
  try {
    const answer = await inquirer.prompt([
      {
        type: 'input',
        name: 'first_name',
        message: 'What is the new employees first name?',
        validate: nameFirst => {
          if (nameFirst) {
            return true;
          } else {
            console.log('Please enter first name.');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'last_name',
        message: 'What is the new employees last name?',
        validate: nameLast => {
          if (nameLast) {
            return true;
          } else {
            console.log('Please enter first name.');
            return false;
          }
        }
      }
    ]);

    const params = [answer.first_name, answer.last_name];
    const roleSQL = `SELECT roles.id, roles.title, roles.salary, department.department_name 
                FROM roles
                LEFT JOIN department ON roles.department_id = department.id`;

    const [data, fields] = await db.promise().query(roleSQL);
    const rolesList = data.map(({ id, title, salary, department_name }) => ({
      name: `${title} (${department_name}) - ${salary}`,
      value: { id, title, salary, department_name }
    }));
    
    // const rolesList = data.map(({id, title}) => ({name: title, value: id}));
    const rolesChoice = await inquirer.prompt([
      {
      type: 'list',
      name: 'roles',
      message: "What role is this employee in?",
      choices: rolesList
      }
    ]);

    const selectedRole = rolesChoice.roles;
    params.push(selectedRole.id);
console.log(params);
  const sql = `INSERT INTO employee (first_name, Last_name, role_id)
                VALUES (?, ?, ?)`;
  await db.promise().query(sql, params);
  console.log(`Added ${answer.first_name} ${answer.last_name}!`);
  await employeeView();
} catch (error) {
console.log(`Error adding employee`, error);
}
};

employeeUpdate = async () => {
  try {
    // Get employees from employee table
    const [employeeRows, employeeFields] = await db.promise().query("SELECT * FROM employee");
    const employees = employeeRows.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));

    // Prompt user to select an employee to update
    const empChoice = await inquirer.prompt([
      {
        type: 'list',
        name: 'name',
        message: "Which employee would you like to update?",
        choices: employees
      }
    ]);

    const employeeId = empChoice.name;

    // Get roles from roles table
    const [roleRows, roleFields] = await db.promise().query("SELECT * FROM roles");
    const roles = roleRows.map(({ id, title }) => ({ name: title, value: id }));

    // Prompt user to select a new role for the employee
    const roleChoice = await inquirer.prompt([
      {
        type: 'list',
        name: 'role',
        message: "What is the employee's new role?",
        choices: roles
      }
    ]);

    const roleId = roleChoice.role;

    // Update employee role in the database
    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
    await db.promise().query(sql, [roleId, employeeId]);

    console.log("Employee has been updated!");
    await employeeView(); // Assuming employeeView() is an async function

  } catch (error) {
    console.error('Error updating employee:', error);
  }
};

viewBudget = async () => {
  console.log(chalk.bold.black.bgCyan('Showing budget by department...\n'));

  try {
    const sql = `SELECT department_id AS id, 
                        department.department_name AS department,
                        SUM(salary) AS budget
                 FROM  roles  
                 JOIN department ON roles.department_id = department.id
                 GROUP BY  department_id`;

    const [rows, fields] = await db.promise().query(sql);
    console.table(rows);
  } catch (error) {
    console.error('Error fetching budget:', error);
  }
  promptUser();
};
