//jshint esversion:6

//import {mailchimpApiKey} from "./key.js";

const express = require("express"),
    bodyParser = require("body-parser"),
    request = require("request"),
    https = require("https"), // Node version RESTful api
    superagent = require("superagent"); // Another RESTful api agent



const mailchimpInstance = "us19";
const listID = "cb7122f618";
const url = `https://${mailchimpInstance}.api.mailchimp.com/3.0/lists/${listID}`;
const port = process.env.PORT || 7000; // ! IMPORT when using inconjuntion with LiverServer extention!!!! 
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
//app.use(bodyParser.json());
app.use(express.static("public"));

app.listen(port,function(){
    console.log(`Server Port: ${port}`);
});


app.get("/failure",(req,res)=>{
    res.sendFile(__dirname+"/failure.html");
});


app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){ // <form action="/" method="POST">

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    //let JSONDump = JSON.stringify(req.body);
    //res.send(JSON.stringify(req.body));

    var data = {  // Create a new object 
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    };

    const JSONFlatPack = JSON.stringify(data);
    //res.send(JSONFlatPack);
    
    const options = { // Create an object to store the options inc api key and method type

        method: 'POST',
        auth: `basic:${mailchimpApiKey}`, // Authentication require anything: plus the api key via -US19 CDN network 
        hostname: 'us19.api.mailchimp.com',
        port: 443,
        path: `/3.0/lists/${listID}/members/`,
        //method: 'GET'
    };
    
    //options.agent = new https.Agent(options);

    const request = https.request(options,(response)=>{
            console.log('statusCode:' +response.statusCode);
        
                response.on("data",(data)=>{
                    console.log(JSON.parse(data));
                    res.send(JSON.parse(data));
                });
      
    });

    request.on('err',(err)=>{
        console.err("ERROR  "+err);
    });

    request.write(JSONFlatPack);
    request.end();

});





app.post("/signup",(req,res)=>{

    superagent
        .post('https://' + mailchimpInstance + '.api.mailchimp.com/3.0/lists/' + listID + '/members/')
        .set('Content-Type', 'application/json;charset=utf-8')
        .set('Authorization', 'Basic ' + new Buffer('any:' + mailchimpApiKey ).toString('base64'))
        .send({
            'email_address': req.body.email,
            'status': 'subscribed',
            'merge_fields': {
                'FNAME': req.body.firstName,
                'LNAME': req.body.lastName
            }
        })
        .end(function(err, response) {
        
            if (response.status < 300 || (response.status === 400 && response.body.title === "Member Exists")) {
                //res.send('Signed Up!' + response.status);
                res.send(response);
            } else {
                res.send('Sign Up Failed :('+err);
            }
    });
});




