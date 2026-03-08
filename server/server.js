require('dotenv').config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require('cors');
const path = require('path'); // ← make sure this line is here


const LoggeeMiddleware = require('./middlewares/logger');
const userRoutes = require('./src/user/userRoutes');

const app = express();

mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.thaq4yn.mongodb.net/`)
.then(()=>{
    console.log("DB is live");
})
.catch((err)=>{
    console.log("DB conection trouble:" + err);
})

app.get("/sign-in-up", (req, res) => {
res.sendFile(path.join(__dirname, "../client/src/sing-in-up/sign-in-up.html"));
});

app.use(cors())
app.use(express.json()); 
app.use(express.static("client"));
app.use(LoggeeMiddleware);

// Use user routes
app.use('/users', userRoutes);

app.listen(3000, () => {
    console.log(`server is on: http://localhost:3000`);
});