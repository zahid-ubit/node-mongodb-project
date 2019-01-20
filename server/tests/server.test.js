
const expect = require('expect');
const request = require('supertest');

var {app}= require('./../server');
var {Todo} =require('./../models/todo');

var todos=[{
    text:'this is first test'
}
,{
    text: 'this is second test'

}
];



beforeEach((done)=>{
 Todo.deleteMany({}).then(()=>{
  return  Todo.insertMany(todos);
 })
 .then(()=>{
done();
 });
});
describe('Post /todos',()=>{

    it('shoud add todos to databse with status 200',(done)=>{

         var text="hello world todo";
        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res)=>{
         expect(res.body.text).toBe(text);

        })
        .end((err,res)=>{
         if(err){
             return done(err);
         }
         Todo.find({text}).then((todos)=>{
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
         }).catch((e)=>done(e));
         
        });
        

    });

    it('should not add bad request data to db',(done)=>{

      request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err,res)=>{
        if(err){
            return done(err);
        }
        Todo.find().then((todos)=>{
         expect(todos.length).toBe(2);
         done();
        }).catch((e)=>done(e));
        
       });
 
    });

});


describe('GET /todos',()=>{

    it('shoud get all todos',(done)=>{

        
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{

            expect(res.body.todos.length).toBe(2);

        })
        .end(done);
        

    });

});