const express = require('express'); // importing a CommonJS module
const morgan = require("morgan")
const helmet = require("helmet")
const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

const logQuote = (coin) => (req,res,next) =>{
  if(coin==="nickel" || coin==="penny" || coin==="quarter" || coin==="dime"){
    console.log(`A ${coin} saved is a ${coin} not enjoyed`)
    next()
  }else{
    res.json("Invalid coin")
  }  
}

const checkWord = (req,res,next)=>{
  if(req.query.word && req.query.word === "turd"){
    res.json(`${req.query.word} is bad, you can't proceed`)
  }else{
    next()
  }
}

server.use(express.json());
server.use(morgan("dev"))
server.use(helmet())
server.use(logQuote("nickel!"))

server.use('/api/hubs', hubsRouter);

server.get('/',checkWord, (req, res) => {
  res.send(`
    <h2>Hubs API</h2>
    <p>Welcome to the Hubs API</p>
  `);
});

server.use('*', (req, res) => {
  // catch all 404 errors middleware
  res.status(404).json({ message: `${req.method} ${req.baseUrl} not found!` });
});

module.exports = server;
