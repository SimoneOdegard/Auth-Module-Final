'use strict';

process.env.SECRET = "secret";

const { server }= require('../src/server.js');
const supergoose = require('@code-fellows/supergoose');
// const supertest = require('supertest')
// const bearer = require('../src/auth/middleware/bearer.js');

const mockRequest = supergoose(server);

let users = [
  { username: 'admin', password: '1234', role: 'admin'},
  { username: 'editor', password: '1234', role: 'editor'},
  { username: 'user', password: '1234', role: 'user'},
  { username: 'user'}
]

describe('Error Handlers', () => {
  it('should respond with 404 on not found route', async() => {
   const response = await mockRequest.get('/wrong-route')

   expect(response.status).toBe(404)
  })
})


describe('Auth Routes', () => {
  it('should sign up a new user', async() => {
    const response = await mockRequest.post('/signup').send(users[1]);

    expect(response.status).toBe(201);
    expect(response.body.token).toBeDefined();
    expect(response.body.user.username).toEqual('editor');
  })

  it('should thow an error if user did not provide information', async() => {
    const response = await mockRequest.post('/signup').send(users[3]);

    expect(response.status).toBe(500);
    expect(response.body.token).not.toBeDefined();
    expect(response.body.user).toBe(undefined);
  })

  it('should sign in a user with basic authentication', async() => {
    const response = await mockRequest.post('/signin')
      .auth(users[1].username, users[1].password)

      expect(response.status).toBe(200);
      expect(response.body.token).toBeDefined();
      expect(response.body.user.username).toEqual('editor')
  })

  it('should not sign in a user with wrong password or username', async() => {
    const response = await mockRequest.post('/signin')
      .auth(users[2].username, users[2].password)

      expect(response.status).toBe(403);
      expect(response.body).toEqual({});
      expect(response.body.token).not.toBeDefined();
  })


  it('should let access a route with bearer and ACL authentification', async() => {
    const signup = await mockRequest.post('/signup').send(users[0])
    const signin = await mockRequest.post('/signin')
      .auth(users[0].username, users[0].password)
    
    const response = await mockRequest.get('/users')
      .set('Authorization', `Bearer ${signin.body.token}`)

    expect(response.status).toBe(200)
    expect(response.body).toEqual(['editor', 'admin'])
  })


})