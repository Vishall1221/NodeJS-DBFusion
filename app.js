var express = require('express');
const mysql = require('mysql2');
const bodyparser = require('body-parser');
var app = express();

app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static('public'));

const connection = mysql.createConnection({
    host: 'localhost',    // Remove trailing space
    user: 'root',               // Remove @localhost
    password: 'Vishal@123',
    database: 'join_us'
});

app.post('/register', function(req,res){
    var person = {email: req.body.email};
    connection.query('INSERT INTO users SET ?', person, function(err, result) {
    console.log(err);
    console.log(result);
    res.redirect("/");
    });
});
   

app.get("/", function(req, res){
    var q = 'SELECT COUNT(*) as count FROM users';
    connection.query(q, function (error, results) {
    if (error) throw error;
    var count = results[0].count;
    res.render("home",{count:count});
    });
});

app.listen(8080,function()
{
    console.log("Waiting on port 8080");
});