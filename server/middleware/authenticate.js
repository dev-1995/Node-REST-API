var {User} = require('./../models/User');
var authenticate = (req,res,next)=>{
	var token = req.header('x-auth');

	User.findByToken(token).then((user)=>{
		console.log(user);
		if(!user) {

			return Promise.reject();
		}
		req.user = user;
		req.token = token;
		console.log(user);
		next();
	}).catch((err)=>{
		console.log(err);
		res.status(401).send();
	});

};

module.exports = {authenticate:authenticate};