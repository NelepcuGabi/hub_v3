// fileController.js

const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

const mongoURI = 'mongodb://127.0.0.1:27017/authentication';

// Create mongo connection
const conn = mongoose.createConnection(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Init gfs
let gfs;
conn.once('open', () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        console.log('Inside file function:', req.body); // Log request body here
        return {
            bucketName: 'uploads', // Collection name in MongoDB
            filename: `${Date.now()}-${file.originalname}`,
            metadata: {
                title: req.body.title,
                description: req.body.description
            }
        };
    }
});

const upload = multer({ storage });

exports.uploadFile = (req, res) => {
    upload.single('file')(req, res, (err) => {
        console.log('After upload middleware, req.body:', req.body); // Log request body here
        if (err) {
            return res.status(500).json({ error: 'An error occurred while uploading the file' });
        }
        return res.status(201).json({ message: 'File uploaded successfully', file: req.file });
    });
};

exports.getFiles = (req, res) => {
    gfs.files.find().toArray((err, files) => {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while retrieving files' });
        }
        if (!files || files.length === 0) {
            return res.status(404).json({ message: 'No files available' });
        }
        return res.status(200).json(files);
    });
};
