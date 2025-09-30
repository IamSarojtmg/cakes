export{}// got rid of the declared block scope
const express = require('express')
const cors = require('cors')
const cakesRoute = require('./routes/cakeRoutes')
import { Request, Response } from "express";


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (req:Request, res:Response) => {
try {
  res.status(200).json({
    status: "success",
    message: "🎂 Cakes API is up and running!",
    version: "1.0.0",
  });
} catch (error) {
  res.status(500).json({ status: "error", message: "Something went wrong" });
}

});

app.use("/cakes", cakesRoute);


module.exports = app;
