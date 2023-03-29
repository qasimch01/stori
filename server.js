const express= require("express");
var app=express();

const bodyParser = require("body-parser")
const request = require("request")
const MailChimp = require("mailchimp-api-v3")
const apiKey = '43cf1b00a27ef7aca4ec2884ef53d304-us18';
const listId = "01bc429b1c";
const mailchimp = new MailChimp(apiKey)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

app.get('/',function (req,res) 
{
 res.sendFile(__dirname+'/index.html');  

 //this is comment
 
})
app.post('/', function(req,res) 
{
const name = req.body.name
  const email = req.body.email
  const fname = req.body.fname
  const lname = req.body.lname
  console.log( `Thanks for subscribing ${email} ${fname}`)

  //mailchimp integration

  mailchimp.post(`/lists/${listId}/members`, {
    email_address: email,
    status: "subscribed",
    merge_fields: {
      FNAME: fname,
      LNAME: lname
    }
  }).then(result=>{
      console.log(result);
      res.send("Thanks for subscribing")
  }).catch(error =>{
      console.error(error);
      res.status(500).send("Error subscribing")

  })

})


app.listen(process.env.PORT || "1000",function () 
{
    console.log("server is started");
})
//list key
//43cf1b00a27ef7aca4ec2884ef53d304-us18
//list id
//01bc429b1c