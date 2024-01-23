const router = require('express').Router();

const db = require('../db/connection')

// const { v4 } = require('uuid');

// const { getUserData, saveUserData } = require('../db');
  
// localhost:333/api/users


// Route to retreive/GET all users from the json database
router.get('/users', async (requestObj, responseObj) => {
  
  // Make a query to the db and get all rows from the users table
  db.query('SELECT * FROM users', (err, users) => { 
    if (err) return console.log(err);

    responseObj.json(users);
  });
});

  // Route to add a user to the json database
  router.post('/users', async (requestObj, responseObj) => {
    
    // Get the old users array
    const userData = requestObj.body;
    
    // Run a query to INSERT a new user into the users table with our requestObj.body data(username, email, password)

    db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', 
    [userData.username, userData.email, userData.password], (err, results) => {
      if (err) return console.log(err);

      responseObj.json({
        message: 'User added successfully!',
        insertId: results.insertId
      })
    });
    
  
    // responseObj.send({
    //   error: 402,
    //   message: 'User already exists'
    // });
  
  });
  
  // GET Route to return a user by ID
  router.get('/users/:id', async (requestObj, responseObj) => {
      const user_id = requestObj.params.id;

      db.query('SELECT * FROM users WHERE id=?', [user_id], (err, user) => {
        if (err) return console.log(err);

        if (user) {
          return responseObj.json(results[0]);
        }

        responseObj.json({
          error: 404,
          message: 'User not found with that'
        })

      });
  });

  // DELETE Route to remove a user from the database
  router.delete('/user/:id', async (requestObj, responseObj) => {
    // Get the user data
    const users = await getUserData();
    const user_id = requestObj.params.id;
    
    //Find the user in the user in the users array matching the param id 
    const filtered = users.find(usrObj => usrObj.id !== user_id);

    
    // Overwrite the old array with the updated array (missing the user object)
    await saveUserData(filtered);

    responseObj.send({
        message: 'User deleted successfully!'
    });

  });

  module.exports = router;


//   // Get the index of the user
//   const index = users.indexOf(user);

//   // Splice the users array, starting at the index of uswer object matching the id from our parameter
//   users.splice(index, 1);
