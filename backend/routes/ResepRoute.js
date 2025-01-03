import express from "express"
import { getResep, getResepById, createResep, UpdateResep, DeleteResep } from "../controller/ResepController.js";

const router = express.Router()

router.get('/resep', getResep)
router.get('/resep/:id', getResepById)
router.post('/resep', createResep)
router.patch('/resep/:id', UpdateResep)
router.delete('/resep/:id', DeleteResep)

export default router;