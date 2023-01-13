//General middleware import
const express = require('express');
const ToDoApps = express();
const { readdirSync } = require("fs")
const cookieParser = require("cookie-parser");

//General middleware implement
ToDoApps.use(express.static('public'));
ToDoApps.use(express.json())
ToDoApps.use(express.urlencoded({ extended: false }));
ToDoApps.use(cookieParser());

//Security middleware import
const helmet = require('helmet');
const cors = require('cors');


//Security middleware Implement
ToDoApps.use(helmet());
ToDoApps.use(cors());


// routes 
readdirSync("./src/routes").map(r => ToDoApps.use("/api/v1", require(`./src/routes/${r}`)))



//All Undefined Routes
ToDoApps.use("*",(req, res)=>{
    res.status(404).json({Status: "fail", Data:"Not found"})
})

//Exports
module.exports=ToDoApps;