const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


var UserSchema = new mongoose.Schema({
	email:{
		type:String,
		required:true,
		trim:true,
		minlength:1,
		unique:true,
		validate:{
			validator:validator.isEmail,
			message:'{VALUE} is not a valid email'
		}
	},
	password:{
		type:String,
		required:true,
		minlength:6
	},
	tokens:[{
		access:{
			type:String,
			required:true
		},
		token:{
			type:String,
			required:true
		}
	}]
});

UserSchema.methods.toJSON = function () {
	var user = this;
	var userObject = user.toObject();
	return {_id:userObject._id,email:userObject.email};
};

UserSchema.methods.generateAuthToken = function(){
	var user = this;
	var access = 'auth';
	var token = jwt.sign({_id:user._id.toHexString(),access},'some').toString();
	user.tokens.push({access, token});
	return user.save().then(()=>{return token;});
}
 UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    return Promise.reject();
  }

module.exports = { User };