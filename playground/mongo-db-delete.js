const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// Connection url
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'TodoApp';
// Connect using MongoClient
MongoClient.connect(url,{useNewUrlParser:true}, function(err, client) {
    assert.equal(null, err,'Failed to connect to mongodb');

    console.log('connected successfully');
    const db=client.db(dbName);

    // db.collection('Users').deleteOne().then((docs)=>{
    //       console.log('Users');
    //       console.log(JSON.stringify(docs,undefined,2));
    // },(err)=>{
    
    //         console.log('error deleting todos ', err);
        
    // });

//     db.collection('Users').deleteMany().then((docs)=>{
//         console.log('Users');
//         console.log(JSON.stringify(docs,undefined,2));
//   },(err)=>{
  
//           console.log('error deleting todos ', err);
      
//   });
     
db.collection('Users').findOneAndDelete({status:'single'}).then((docs)=>{
    console.log('Users');
    console.log(JSON.stringify(docs,undefined,2));
},(err)=>{

      console.log('error deleting todos ', err);
  
});
     client.close();
});