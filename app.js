//jshint esversion:6
const express = require("express"),
    bodyParser = require("body-parser"),
    request = require("request"),
    https = require("https");


const url = "";
const listID = "cb7122f618";
const port = 7000; // !!!!!!!!! IMPORT when using inconjuntion with LiverServer extention!!!! 
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.listen(port,function(){
    console.log(`Server Port: ${port}`);
});

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){

    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;

    let JSONDump = JSON.stringify(req.body);
    //res.send(JSON.stringify(req.body));


    // Create a new object

    var data = {
        
        members: [
            {
                email_address: "",
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }

        ]

    };

    let JSONFlatPack = JSON.stringify(data);
    res.send(JSONFlatPack);



    https.request(url,options,function(response){

    });

});




// API key 


