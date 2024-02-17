const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

// Creates id for each
// const { v4 : uuidv4 } = require('uuid');

// Public folder access
app.use(express.static('public'))
app.use(express.json())

// PROJECT

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'schneidsmc',
      // TODO: Add MySQL password here
      password: 'mcSnipes!2',
      database: 'employees_db'
    },
    console.log(`Connected to the movies_db database.`)
  );
  

  
  // Default response for any other request (Not Found)
  app.use((req, res) => {
    res.status(404).end();
  });
//   Listen.
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  