const bcrypt = require('bcryptjs');

var password = 'okokok';
bcrypt.genSalt(10,(err,salt)=>{
	bcrypt.hash(password, salt, (err, hash)=>{
		console.log(hash);
	})
});

var hp = "$2a$10$/awdgnn8FTo5X7TEe0mqzurNLbXTp.aP9xsBZeeI7JsaMhDzTL7H2";

bcrypt.compare('password', hp).then((val)=>console.log('val: ', val))