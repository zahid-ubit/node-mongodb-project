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
    //  db.collection('Users').insertOne({
    //      naem:' hamdard',
    //      status:'married'
    //  }, (err,result)=>{
    //    assert.equal(null,err,"failed to insert");
    //    console.log(JSON.stringify(result.ops,undefined,3));
    //  });

    db.collection('Users').find({naem:"zahid hamdard"}).toArray().then((docs)=>{
          console.log('Users');
          console.log(JSON.stringify(docs,undefined,2));
    },(err)=>{
    
            console.log('error finding todos ', err);
        
    });
     
     client.close();
});