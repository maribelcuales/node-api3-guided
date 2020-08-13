const express = require('express'); // importing a CommonJS module

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

// global middleware 
server.use(express.json());  // built in middleware, no need to npm install it 

// three amigas 
server.use(function(req, res, next){
  const today = new Date().toISOString(); // YYYY-MM-DD 
  console.log(`[${today}] GET to URL `);
  next(); 
});

server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
