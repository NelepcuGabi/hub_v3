const express = require('express');
const fileController = require('../controllers/fileController'); // Adjust the path as needed

const router = express.Router();

// Use body-parser middleware
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post('/upload', fileController.uploadFile);
router.get('/files', fileController.getFiles);

module.exports = router;