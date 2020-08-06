var mysql = require('mysql');
var Client = require('ssh2').Client;
var ssh = new Client();

var db = new Promise(function(resolve, reject){
	ssh.on('ready', function() {
	  ssh.forwardOut(
	    // source address, this can usually be any valid address
	    '114.73.146.123',
	    // source port, this can be any valid port number
	    5000,
	    // destination address (localhost here refers to the SSH server)
	    '52.62.16.126',
	    // destination port
	    9113,
	    function (err, stream) {
			if (err) throw err; // SSH error: can also send error in promise ex. reject(err)
	      // use `sql` connection as usual
			connection = mysql.createConnection({
				host     : '52.62.16.126',
				user     : 'root',
				password : '', 
				database : 'aether',
			});

	        // send connection back in variable depending on success or not
			connnection.connect(function(err){
				if (err) {
					resolve(connection);
				} else {
					reject(err);
				}
			});
	 	});
	}).connect({
	  host: '52.62.16.126',
	  port: 9113,
	  username: 'root',
	  password: ''
	});
});

module.exports = db;