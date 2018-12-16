const mysql = require('mysql');
const express = require('express')
var app = express();

const bodyparser = require('body-parser')

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'vamsi@79',
    database:'EmployeeDB',
    multipleStatements:true
});

mysqlConnection.connect((err)=>{
    if(!err)
        console.log("Connection success");
    else    
        console.log("DB Connection failed"+JSON.stringify(err,undefined,2));
});

app.listen(3000,()=>console.log('Express server is running at port number 3000'));


//Get all Employees
app.get('/employees',(req,res)=>{
    mysqlConnection.query('SELECT * FROM employee',(err,rows,fileds)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});


app.get('/employees/:id',(req,res)=>{
    mysqlConnection.query('SELECT * FROM employee WHERE EmpID=?',[req.params.id],(err,rows,fileds)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});

app.delete('/employees/:id',(req,res)=>{
    mysqlConnection.query('DELETE * FROM employee WHERE EmpID=?',[req.params.id],(err,rows,fileds)=>{
        if(!err)
        res.send("Deleted");
        else
        console.log(err);
    })
});

app.post('/employees',(req,res)=>{
    let emp = req.body;
    var sql = "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?;CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);";
    mysqlConnection.query(sql,[emp.EmpID, emp.Name, emp.EmpCode,emp.Salary],(err,rows,fileds)=>{
        if(!err)
            rows.forEach(element =>{
                if(element.constructor == Array)
                res.send('Inserted Employee ID:'+element[0].EmpID);
            });
        else
        console.log(err);
    })
});

app.put('/employees',(req,res)=>{
    let emp = req.body;
    var sql = "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?;CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);";
    mysqlConnection.query(sql,[emp.EmpID, emp.Name, emp.EmpCode,emp.Salary],(err,rows,fileds)=>{
        if(!err)
           res.send('Updated Successfully');
        else
        console.log(err);
    })
});
