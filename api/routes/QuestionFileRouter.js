const express = require('express');
const multer = require('multer');
const { uploadQuestions, listQuestions } = require('../controllers/uploadQuestion');

const router = express.Router();
const upload = multer({
    dest: 'uploads/',
    limits: {
        fileSize: 1 * 1024 * 1024  // Giới hạn kích thước file là 1MB
    },
    fileFilter: (req, file, cb) => {
        // Kiểm tra loại file, chỉ chấp nhận file .txt
        if (file.mimetype !== 'text/plain') {
            return cb(new Error('Only .txt files are allowed!'), false);
        }
        cb(null, true);
    }
});// specify a directory for temporary file storage



// Define route for uploading a question file
router.post('/upload', upload.single('file'), uploadQuestions);
router.get('/list', listQuestions);

module.exports = router;
