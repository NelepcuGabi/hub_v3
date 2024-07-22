const express = require ('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRoute')
const fileRouter = require('./routes/fileRoute');

const app = express();

 //MiddleWares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));

app.use(cookieParser());
 //Routes
app.use ('/api/auth', authRouter);
app.use('/api/files', fileRouter);

 //MongoDB Connection
mongoose
.connect('mongodb://127.0.0.1:27017/authentication', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB!'))
    .catch((error)=>console.error("Failed to connect to MongoDB:", error));

 //Error Handling
app.use((err, req, res, next) =>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    })
});

 //Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App running on ${PORT}`);
});
