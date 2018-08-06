
const { mongoose } = require('./db/mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const {authenticate} = require('./middleware/authenticate');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();
// Middleware
app.use(bodyParser.json());

 
 

//Routes
app.get('/',(req,res)=>{
	res.send('Welcome Home!');
});

app.get('/todos',(req,res)=>{
	Todo.find().then((data)=>res.send(data));
},(err)=>{
	res.status(400).send(err);
})

app.post('/todos',(req,res)=>{
	var todo = new Todo({
		text:req.body.text
	});
	todo.save().then(data=>res.send(data)).catch(err=>res.send(err));
})

//POST /users
app.post('/users',(req,res)=>{

	var user = new User({
		email:req.body.email,
		password:req.body.password
	})

	user.save().then(()=>{
		return user.generateAuthToken();
		// res.send(data);
	}).then((token)=>{
		res.header('x-auth',token).send(user);
	}).catch((err)=>{
		res.status(400).send(err);
	})
})


app.get('/users/me', authenticate, (req,res)=>{
	res.send(req.user);
});

//Start Server
app.listen(3000,()=>{
	console.log('Server Running at localhost:3000');
})

module.exports = { app };