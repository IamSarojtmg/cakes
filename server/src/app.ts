export{}// got rid of the declared block scope
const express = require('express')
const cors = require('cors')
const cakesRoute = require('./routes/cakeRoutes')

const app = express();

app.use(cors());
app.use(express.json());

app.use("/cakes", cakesRoute);

module.exports = app;
