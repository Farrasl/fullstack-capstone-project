const express = require('express');
const router = express.Router();

const connectToDatabase = require('../models/db');


// GET /api/gifts
router.get('/', async (req, res) => {
    try {
        const db = await connectToDatabase();

        const collection = db.collection("gifts");

        const gifts = await collection.find({}).toArray();

        res.json(gifts);
    } catch (e) {
        console.error(e);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});


// GET /api/gifts/:id
router.get('/:id', async (req, res) => {
    try {
        const db = await connectToDatabase();

        const collection = db.collection("gifts");

        const id = req.params.id;

        const gift = await collection.findOne({
            id: id
        });

        if (!gift) {
            return res.status(404).json({
                error: 'Gift not found'
            });
        }

        res.json(gift);
    } catch (e) {
        console.error(e);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});


module.exports = router;