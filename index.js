// const db = require("./db/conn")
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const userroute = require("./routes/controllers")
const mongoose = require("mongoose")
const app = express()
app.use(cors());
const port = 3000
app.use(bodyParser.json());
app.use("/api/",userroute)

mongoose.connect("mongodb+srv://Ycompany:Yadnesha%406354@cluster0.0ynjx.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true,
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