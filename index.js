// const db = require("./db/conn")
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
require('dotenv').config()
const userroute = require("./routes/controllers")
const rentuserroute = require("./routes/rentUserroutes")
const mongoose = require("mongoose")
// var myId = new mongoose.Types.ObjectId();
const app = express()
app.use(cors());
const port = process.env.production_port
// console.log(myId)
app.use(bodyParser.json());
app.use("/api/",userroute)
app.use("/api/user",rentuserroute)

mongoose.connect(process.env.mongoDb, { useNewUrlParser: true,
useUnifiedTopology: true,
// useCreateIndex: true,
// useFindAndModify: false,
 })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB', err));
  app.get("*",(req,res)=>{
   res.send('My 404 page')
})
app.listen(port ,()=>{
   console.log(`server running on ${port}`)
})