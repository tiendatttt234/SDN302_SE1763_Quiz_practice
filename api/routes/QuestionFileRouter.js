
const express = require('express');
const multer = require('multer');
const { uploadQuestions, listQuestions } = require('../controllers/uploadQuestion');

const router = express.Router();


const upload = multer({
    dest: 'uploads/', 
    limits: { fileSize: 5 * 1024 * 1024 }, B
});


router.post('/upload', (req, res, next) => {
    upload.single('file')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            
            return res.status(400).json({ error: 'File upload error. Please ensure the file is less than 5MB.' });
        } else if (err) {
           
            return res.status(500).json({ error: 'An unexpected error occurred during file upload.' });
        }
        next();
    });
}, uploadQuestions);

router.get('/list', listQuestions);

module.exports = router;
