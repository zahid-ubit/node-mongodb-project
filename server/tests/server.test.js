
const expect = require('expect');
const request = require('supertest');

var {ObjectID}= require('mongodb');

var {app}= require('./../server');
var {Todo} =require('./../models/todo');


var todos=[{
    _id: new ObjectID(),
    text:'this is first test'
}
,{
    _id: new ObjectID(),
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

    describe('GET /todo with id',()=>{

        it('shoud get todo by id',(done)=>{
    
            
            request(app)
            .get('/todos/'+todos[0]._id.toHexString())
            .expect(200)
            .expect((res)=>{
    
                expect(res.body.todos.text ).toBe(todos[0].text);
    
            })
            .end(done);
            
    
        });

        it('shoud get 404 ',(done)=>{
    
            
            request(app)
            .get('/todos/'+"123")
            .expect(404)
            .end(done);
            
    
        });

        it('shoud get 404 no todo found ',(done)=>{
    
            var id = new ObjectID().toHexString();
            request(app)
            .get(`/todos/${id}`)
            .expect(404)
            .end(done);
            
    
        });

    });

