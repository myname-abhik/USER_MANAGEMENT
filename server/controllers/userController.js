const mysql = require('mysql');

// Connection Pool
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password :process.env.DB_PASS
});

// // View Users
exports.view = (req, res) => {
  // User the connection
  connection.query('SELECT * FROM user WHERE status = "active" ', (err, rows) => {
    // When done with the connection, release it
    if (!err) {
      // let removedUser = req.query.removed;
      res.render('./home.hbs', {rows});
      // res.json({start :"hello"});
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
  
}
exports.find = (req, res) => {
    let searchTerm = req.body.search;
    // console.log()
    // User the connection
    connection.query('SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?  OR phonr LIKE ? OR email LIKE ?', ['%%' + searchTerm + '%%', '%%' + searchTerm + '%%','%%' + searchTerm + '%%','%%' + searchTerm + '%%'], (err, rows) => {
      if (!err) {
        res.render('home', { rows });
      } else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
    });
  }
  exports.form = (req, res) => {
    res.render('add-user');
  }
  

  exports.create = (req, res) => {
  const { first_name, last_name, email, phone,id,comment} = req.body;
  let searchTerm = req.body.search;
  const i=0;
  // i=i+1;

  // User the connection
  connection.query('INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phonr = ?', [first_name, last_name, email, phone], (err, rows) => {
    if (!err) {
     
      res.render('add-user', { alert: 'User added successfully.' });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
}

// exports.edit = (req, res) => {
//   res.render('edit-user');
// }
exports.edit = (req, res) => {
  // User the connection
  connection.query('SELECT * FROM user WHERE id= ? ', [req.params.id],(err, rows) => {
    // When done with the connection, release it
    if (!err) {
      
      res.render('edit-user', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
  
}
exports.update = (req, res) => {
  // User the connection
  const { first_name, last_name, email, phone} = req.body;
  connection.query('UPDATE  user SET  first_name = ?, last_name = ?, email = ?, phonr = ? WHERE id = ?', [first_name, last_name,email,phone,req.params.id],(err, rows) => {
    // When done with the connection, release it
    if (!err) {
      
      connection.query('SELECT * FROM user WHERE id= ? ', [req.params.id],(err, rows) => {
        // When done with the connection, release it
        if (!err) {
          
          res.render('edit-user', { rows, alert: 'User updated successfully.' });
        } else {
          console.log(err);
        }
        console.log('The data from user table: \n', rows);
      });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
  
}
exports.delete = (req, res) => {
  
  connection.query('DELETE FROM user WHERE id = ?', [req.params.id], (err, rows) => {

    if(!err) {
      res.redirect('/');
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);

  });
  
}
exports.viewall = (req, res) => {

  // User the connection
  connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('view-user',{rows});
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });

}
  