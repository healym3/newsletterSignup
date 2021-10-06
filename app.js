const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  }

  const jsonData = JSON.stringify(data);
  const url = "https://us5.api.mailchimp.com/3.0/lists/7d807a83e2";
  const options = {
    method: "POST",
    auth: "healym3:a4e33224882f194dd6860e7a70cb2a41-us5"
  }
  const request = https.request(url, options, function(response){
    if (response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function(data){
      //console.log(data
      //console.log(JSON.stringify(data));
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();


});

app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});

//mailchimp api key
// a4e33224882f194dd6860e7a70cb2a41-us5

//mailchimp mail list
// 7d807a83e2
