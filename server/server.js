const express= require('express');
const bodyParser =require('body-parser');
var {mongoose} = require('./db/mongoose');
const {Todo}=require('./models/todo');


var app=new express();

app.use(bodyParser.json());
app.post('/todos',(req,res)=>{
   var newtodo = new Todo(
       {
           
        text:req.body.text
       }
   
   );
 newtodo.save().then((docs)=>{
    res.send(docs);
 },(er)=>{
  res.status(400).send(er);
 });
   });



   app.get('/todos',(req,res)=>{
      
      Todo.find().then((todos)=>{
         res.send({todos});
      },
      (er) =>{
         res.status(400).send(er);
        })
      });

app.listen(3000,()=>{
 console.log('server started at port 3000');
});


module.exports={app};

