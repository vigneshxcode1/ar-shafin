import express from 'express'
import {  createmosque, deletemosque, getmosques, singlemosque, updatemosque } from '../controllers/mosque.js';
import route from './Userroute.js';
import mosqueModel from '../models/mosque.js';

const router = express.Router();

router.post("/createmosque",createmosque);
router.get("/detailsmosque/:id",singlemosque);
router.put("/updatemosque/:id",updatemosque);
router.delete("/deletemosque/:id",deletemosque);
router.get("/getmosque",getmosques);




//admin mymosque
router.get('/my-mosques', async (req, res) => {
    const adminId = req.headers['admin-id']; // Retrieve admin ID from the request header

    if (!adminId) {
        return res.status(400).json({ success: false, message: 'Admin ID is required.' });
    }

    try {
        // Fetch mosques belonging to the specific admin
        const mosques = await mosqueModel.find({ uniqueId: adminId });
        
        if (!mosques.length) {
            return res.status(404).json({ success: false, message: 'No mosques found for this admin.' });
        }

        res.json({ success: true, mosques });
    } catch (error) {
        console.error('Error fetching mosques:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});



export default router;