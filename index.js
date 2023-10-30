const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
const jobRouter = require('./routes/job');
const bodyParser = require('body-parser');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URL)
    .then(()=> console.log('Connect to V2 Db'),{ useNewUrlParser: true, useUnifiedTopology: true })
    .catch((err)=>console.log(err));


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use('/api/jobs',jobRouter)

app.get('/', (req,res) => res.send('Hello World!'))
app.listen(process.env.PORT || port , () => console.log(`The Hub is listening on port ${process.env.PORT}!`))



