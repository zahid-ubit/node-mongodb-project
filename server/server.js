const express= require('express');
const bodyParser =require('body-parser');
var {mongoose} = require('./db/mongoose');
const {Todo}=require('./models/todo');
const {authenticate}=require('./middleware/authenticate');
const {User}=require('./models/user');
var {ObjectID} =require('mongodb');
var _ = require('lodash');

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

 
    
   app.get('/users/me',authenticate,(req,res)=>{
  
       res.send(req.user);
   
   });



   app.post('/users',(req,res)=>{
      var body=_.pick(req.body,['email','password']);
      var user = new User(body);
    user.save().then(()=>{
      return  user.genrateAuthToken();
    }).then((token)=>{
       res.header('x-auth',token).send(user);
    }).catch((er)=>{
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

      app.get('/todos/:id',(req,res)=>{
            var id=req.params.id;
           if(!ObjectID.isValid(id)){
              return res.status(404).send('invalid id supplied');
           }
          
         Todo.findById(id).then((todos)=>{
            if(!todos)
            {
               return res.status(404).send('todo not found in database');
            }
            res.send({todos});
         },
         (er) =>{
            res.status(400).send(er);
           })
          });


          app.delete('/todos/:id',(req,res)=>{
            var id=req.params.id;
           if(!ObjectID.isValid(id)){
              return res.status(404).send('invalid id supplied');
           }
          
         Todo.findByIdAndDelete(id).then((todos)=>{
            if(!todos)
            {
               return res.status(404).send('todo not found in database');
            }
            res.send({todos});
         },
         (er) =>{
            res.status(400).send(er);
           })
          });

          app.patch('/todos/:id',(req,res)=>{
            var id=req.params.id;
            var body=_.pick(req.body,['text','completed']);
           if(!ObjectID.isValid(id)){
              return res.status(404).send('invalid id supplied');
           }

           if(_.isBoolean(body.completed) && body.completed){
              body.completedAt= new Date().getTime();
           }
           else{
              body.completed=false;
              body.completedAt=null;
           }
          
         Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todos)=>{
            if(!todos)
            {
               return res.status(404).send('todo not found in database');
            }
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

