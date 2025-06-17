import express from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

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
