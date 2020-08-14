const express = require('express'); // importing a CommonJS module

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

// global middleware 
server.use(express.json());  // built in middleware, no need to npm install it 

server.use('/api/hubs', gate, role('fellowship'), hubsRouter);

function role(roleName) {

  return function role(req, res, next) {
    
    let role = req.headers.role;
  
    if(role === roleName) {
      next();
    } else {
      res.status(403).json({ you: 'have no power here' });
    }
  };
};


// three amigas 
server.use(function(req, res, next){
  const today = new Date().toISOString(); // YYYY-MM-DD 
  console.log(`[${today}] ${req.method} to ${req.url}`);

  next(); 
});

// server.use(gate);

server.get('/moria', gate, (req, res) => {
  res.status(200).json({ welcome: 'friends' });
});

// before the request handler runs, have a middleware that makes your name available to display 
function addMe(req, res, next) {
  req.name = 'Luis';

  next();
}

server.get('/', addMe, (req, res) => {
  const name = req.name || 'stranger'; 
  // const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome ${name} to the Lambda Hubs API</p>
    `);
});

function gate(req, res, next) {
  let password = req.headers.password;

  if(password && typeof password === 'string') {
    password = password.toLowerCase(); 
   
    if(password === 'mellon') {
      next();
    } else {
      res.status(401).json({ you: 'cannot pass! '});
    }
  } else {
    res.status(400).json({ message: 'speak friend and enter' });
  }
}
/* 
  check the headers to see if there is a password property 
  if there is, check that it is 'mellon'
    if it is, call next();
    otherwise, return status 401 and { you: 'cannot pass' }
  if there is no password, return status 400 and { message: 'speak friend and enter' }
*/

module.exports = server;
