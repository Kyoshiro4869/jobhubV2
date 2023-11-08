require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const jobRouter = require('./routes/job');
const bodyParser = require('body-parser');
const authRouter = require('./routes/auth');
const bookmarkRouter = require('./routes/bookmark');
const admin  = require('firebase-admin');
const serviceAccount = require('./ServiceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});



mongoose.connect(process.env.MONGO_URL)
    .then(()=> console.log('Connect to V2 Db'),{ useNewUrlParser: true, useUnifiedTopology: true })
    .catch((err)=>console.log(err));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/api/jobs',jobRouter);
app.use('/api/bookmarks',bookmarkRouter);
app.use('/api/',authRouter);


app.listen(port ,() => console.log(`The Hub is listening on port ${port}!`));


