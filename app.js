//jshint esversion:6
const express = require("express"),
    bodyParser = require("body-parser"),
    request = require("request");


const apiKey =  "58f0a4b15abd2bf32cb1ef37b8c261e4-us19";
const port = 7000; // !!!!!!!!! IMPORT when using inconjuntion with LiverServer extention!!!! 
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){

    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;

    let JSONDump = JSON.stringify(req.body);
    res.send(JSON.stringify(req.body));
});

app.listen(port,function(){
    console.log(`Server Port: ${port}`);
});


// API key 
// 58f0a4b15abd2bf32cb1ef37b8c261e4-us19

