import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

interface cakeData {
  name: string;
  imageUrl: string;
  comment: string;
  yumFactor: null | number;
}

let cakes: cakeData[] = [{
  name: "velvet",
  imageUrl: "just a string",
  comment: "tasty cake",
  yumFactor: 3,
}];

app.use(cors());
app.use(express.json());

app.get("/cakes", (req, res) => {
  console.log('get request');
  res.json(cakes);
});

app.post("/cakes", (req, res) => {
  console.log(req.body,'post request');
  res.status(201).json(req.body)
});

app.listen(PORT, () => {
  console.log(`Well done! its runing at http://localhost:${PORT}`);
});

mongoose.connect(MONGO_URI).then(()=>{console.log("mongoDB connected");
}).catch((err)=> console.error("MongoDB connection error =", err))