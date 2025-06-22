import { Router } from "express";
import { getAllCakes, postCake } from "../controllers/cakesController";

const router = Router();

router.get("/", getAllCakes);
router.post("/", postCake);

export default router;
