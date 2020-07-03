const mysql=require('mysql');
const express=require('express');
var app=express();
const bodyParser=require('body-parser');
const { json } = require('body-parser');


var mysqlConn=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'janfirthu1516',
    database:'empdbse',
});
//connecting server to database
 mysqlConn.connect((err)=>{
     if(!err)
     console.log("connection to database success");
     else
     console.log("connection failed"+JSON.stringify(err,undefined,2));
    })
 
    app.use(bodyParser.urlencoded({extended:false})) //urltojson
    app.use(bodyParser.json())




// Get all employees information

app.get('/employees',(req,res)=>{
 mysqlConn.query('SELECT*FROM employee',(err,rows)=>{
        if(!err)
    res.send(rows);
        else
        console.log(err)
 })
});

//getting  a specific employee data
app.get('/employeee/:id',(req,res)=>{
    console.log(req.params);
    mysqlConn.query('SELECT*FROM employee WHERE EmpID = ?',[req.params.id],(err,rows)=>{
           if(!err)
       res.send(rows);
           else
           console.log(err)
    })
   });

//delete an employee data
app.delete('/employee/:id',(req,res)=>{
    mysqlConn.query('DELETE FROM employee WHERE EmpID = ?',[req.params.id],(err,rows)=>{
           if(!err)
           res.send("deleted employee data sucessfully");
           else
           console.log(err)
    })
   });



 //insert an employee data
 app.post('/employees/insert', (req, res) => {
    var sqlcon = "insert into employee values ('"+req.body.EmpID+"','"+req.body.Name+"','"+req.body.EmpCode+"',"+req.body.Salary+")";
    console.log(sqlcon);
    mysqlConn.query(sqlcon,(err,rows) => {
        if(!err)
        res.send(rows)
        else
        console.log(err)
    })
    });

//update an employee data

app.put('/employees/upt', (req, res) => {
        let id=parseInt(req.body.EmpID) //converting string into integer
        let name=req.body.Name
        let empcode=req.body.EmpCode
        let salary=req.body.Salary
        console.log(req.body);
   var red= mysqlConn.query("UPDATE employee SET name=?,empcode=?,salary=? WHERE EmpID=?",[name,empcode,salary,id],(err,rows)=>
            {
                if(!err)
                res.send("updated sucessfully");
                else
                console.log(err)
            })
        });
          
//make port to listen   

app.listen(7844,()=>console.log("ex server connected"))
      