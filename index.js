const express = require('express');
var exphbs = require('express-handlebars');
const app = express();

require('dotenv').config();

const port = process.env.PORT||5000;
const bodyparser = require('body-parser');
const mysql = require('mysql');

app.use(express.urlencoded({extended:false}));
// app.use(bodyparser.urlencoded({extended:false}));
// app.use(bodyparser.json());
//static files
app.use(express.static('public'));
const handlebars = exphbs.create({ extname: '.hbs',});
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');

//connection pull
// const pool = mysql.createPool({
//     connectionlimit:100,
//     host  : process.env.DB_HOST,
//     user : process.env.DB_USER,
//     database : process.env.DB_NAME
    
// });
// //connection
// pool.getConnection((err, connection) => {
//     if(err) throw err;
//     console.log('connected as id '+ connection.threadId);
// });

const routes = require('./server/route/user');
// app.use('/', routes);






// app.get('', (req, res) => {
//   return res.render('home.hbs');
// });
const route1 = require('./server/route/user');
app.use('/',route1)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});