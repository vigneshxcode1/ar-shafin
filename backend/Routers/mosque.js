import express from 'express'
import { createmosque, deletemosque, getmosques, singlemosque, updatemosque } from '../controllers/mosque.js';


const router = express.Router();

router.post("/createmosque",createmosque);
router.get("/getmosque",getmosques);
router.get("/detailsmosque/:id",singlemosque);
router.put("/updatemosque/:id",updatemosque);
router.delete("/deletemosque/:id",deletemosque);



export default router;