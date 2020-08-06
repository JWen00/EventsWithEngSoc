const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const connection = mysql.createPool({
  host: 'server.dev.unswengsoc.com',
  port: 9113,
	user: 'root',
	password: '',
	database: 'aether'
})

//starting our app
const app = express()

//dummy route (getting all users)
app.get('/users', function (req, res) {
	// Connecting to the database.
	  connection.getConnection(function (err, connection) {
    if (err) {
        console.log('the error was', err)
    } else {
      // Executing the MySQL query (select all data from the 'users' table).
        connection.query('SELECT * FROM users', function (error, results, fields) {
        // If some error occurs, we throw an error.
            if (error) throw error;
            // Getting the 'response' from the database and sending it to our route. This is were the data is.
            console.log('the results are', results)
            res.send(results)
        });
    }

	});
});

// Starting our server.
app.listen(5000, () => {
	console.log('just watching the clock from the sofa');
});