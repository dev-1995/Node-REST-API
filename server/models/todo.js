const  mongoose  = require('mongoose');
const Todo = mongoose.model('Todo',{
	text:{
		type:String,
		required:true,
		minlength:1,
		trim:true
	},
	Completed:{
		type:Boolean,
		default:false
	}
});

module.exports = { Todo };

