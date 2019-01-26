const mongoose = require('mongoose');
const  jwt = require('jsonwebtoken');
const validator = require('validator');
const _ =require('lodash');

const Schema =mongoose.Schema;

var UserSchema= new Schema({
    email:{
        type: String,
        required:true,
        unique:true,
        minlength:2,
        validate: {
            validator: validator.isEmail,
            message:'{VALUE} is not Valid email'
        }
    }
    ,
    password:{
        type: String,
       required:true,
       minlength:6,
    },
    tokens:[{
     access:{
      type:String,
      required:true,
     },
     token:{
     type:String,
     required:true,
     }
    }]

});


UserSchema.statics.findByToken= function(token){
var User=this;

var decode;

try {
    decode= jwt.verify(token,'hello123');
} catch (e) {
    return Promise.reject();
}
 return User.findOne({
 _id:decode._id,
 'tokens.token':token,
  'tokens.access':'auth'
});

};

UserSchema.methods.toJSON=function(){
    var user =this;
    var userObject =user.toObject();
    return _.pick(userObject,['_id','email']);
};
UserSchema.methods.genrateAuthToken= function(){
 var user =this;
  var access='auth';
  var token=jwt.sign({_id: user._id.toHexString(),access},'hello123').toString();
  user.tokens.push({access,token}); 
  return user.save().then(()=>{
      return token;
  });
};

var User = mongoose.model('User',UserSchema);

 module.exports={User};