const Training = require('../models/Training')

exports.createTraining = async (req, res, next) => {
    try {
        const training = await Training.create(req.body);
        res.status(201).json({ success: true, data: training });
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
    }
}

exports.getAllTraining = async (req, res, next) => {
    try {
        let query;
        let queryStr = JSON.stringify(req.query);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
        query = Training.find(JSON.parse(queryStr));
        const trainings = await query;
        res.status(200).json({ success: true, count: trainings.length, data: trainings });
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message });
    }
}

exports.getTraining = async (req, res, next) => {
    try {
        const training = await Training.findById(req.params.id);
        if (!training) {
            return res.status(400).json({ success: false, msg: 'Not found' });
        }
        res.status(200).json({ success: true, data: training });
    } catch (error) {
        res.status(400).json({ success: false });
    }
};