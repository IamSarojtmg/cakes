import express from "express";
import cors from "cors";
import router from "./routes/cakeRoutes";

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use("/cakes", router);

export default app;
