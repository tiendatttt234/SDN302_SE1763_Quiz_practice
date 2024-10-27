
const express = require('express');
const multer = require('multer');
const { uploadQuestions, listQuestions } = require('../controllers/uploadQuestion');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });


router.post('/upload', upload.single('file'), uploadQuestions);
router.get('/list', listQuestions);

module.exports = router;
