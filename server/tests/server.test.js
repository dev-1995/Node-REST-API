const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');



beforeEach((done)=>{
	Todo.remove({}).then(()=>{
		Todo.insertMany(todos);
	}).then(()=>done());
})
const todos = [{text:"Todo 1"},{text:"Todo 2"}];
// POST Test
describe('POST /todos',()=>{
	it('should create a todo', (done)=>{
		var text  = 'Test Text';
		request(app)
		.post('/todos')
		.send({text})
		.expect(200)
		.expect((res)=>{
			expect(res.body.text).toBe(text);
		})
		.end((err, res)=>{
			if(err){
				return done(err);
			}

			Todo.find({text}).then((todos)=>{
				expect(todos.length).toBe(1);
				expect(todos[0].text).toBe(text);
				done();

			}).catch((err)=>done(err));
		})
	})

	//second test invalid format
});

// GET test

describe('GET /todos',()=>{
	it('should get all todos',(done)=>{
		request(app)
		.get('/todos')
		.expect(200)
		.expect((res)=>{
			console.log('res.body: ', JSON.stringify(res.body));
			expect(res.body.length).toBe(2);

		})
		.end(done);
	})
})