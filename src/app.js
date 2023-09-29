const express = require('express');
const routes = require('express').Router();
const bodyParser = require('body-parser');
const cors =require('cors');
const taskInfo =require('./routes/taskInfo');

const app = express();
app.use(cors());
app.use(routes);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
const PORT = 3000;

routes.get('/',(req,res)=>{
    res.status(200).send("Welcome to Task Manager");
})

routes.use('/tasks',taskInfo);

app.listen(PORT, (err)=>{
    if(!err){
        console.log("Server started successfuly");
    }
    else{
        console.log("Failure in starting server");
    }
})

