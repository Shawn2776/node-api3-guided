const express = require('express'); // importing a CommonJS module
const morgan = require("morgan")
const helmet = require("helmet")
const mw = require("./middlewares/middlewares.js")
const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

server.use(express.json());
server.use(morgan("dev"))
server.use(helmet())
server.use(logQuote("nickel"))

server.use('/api/hubs',checkWord, hubsRouter);

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
