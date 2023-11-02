require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const jobRouter = require('./routes/job');
const bodyParser = require('body-parser');





mongoose.connect(process.env.MONGO_URL)
    .then(()=> console.log('Connect to V2 Db'),{ useNewUrlParser: true, useUnifiedTopology: true })
    .catch((err)=>console.log(err));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/api/jobs',jobRouter);



app.listen(port ,() => console.log(`The Hub is listening on port ${port}!`));


