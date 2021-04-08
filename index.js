// init project
const express = require("express"); // the library we will use to handle requests
const { MongoClient } = require("mongodb"); // load mongodb
const nodemailer = require("nodemailer"); // for emailing suggestions
const port = 4567; // port to listen on
const app = express(); // instantiate express
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

app.use(require("cors")()); // allow Cross-domain requests
app.use(require("body-parser").json()); // automatically parses request data to JSON
app.use(express.static(__dirname));
// make sure in the free tier of MongoDB atlas when connecting, to
// select version 2.2.* as the node.js driver instead of the default 3.0
const uri = "mongodb+srv://randomuser:fucksluts@freespeechshieldcluster.8apgw.mongodb.net";
// Create a new MongoClient
const client = new MongoClient(uri, {useNewUrlParser:true, useUnifiedTopology:true});

async function emailSuggestion(socket, windowlocation) {
  try{
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'austin.capobianco@gmail.com',
        pass: '??????????????????????'
      }
    });

    var mailOptions = {
      from: 'austin.capobianco@gmail.com',
      to: 'austin.capobianco@gmail.com',
      subject: 'request for audit',
      text: JSON.stringify(windowlocation)
    };

  }catch(error){
    console.error(error);
  }finally{
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
}

async function locateOneByQuery(socket, jsonOfUrlsToSearch) {
  var result = null;
  try{
    const client = await MongoClient.connect(uri, {useNewUrlParser: true});
    result = await client.db("DatabaseOfSites").collection("DatabaseOfSites").findOne({ domain: jsonOfUrlsToSearch.domain });
    if(result!==null){
      console.log("domain match found");
    }else{
      console.log("no domain match, checking url");
      result = await client.db("DatabaseOfSites").collection("DatabaseOfSites").findOne({ url: jsonOfUrlsToSearch.url });
    }
  }catch(error){
    console.error(error);
  }finally{
    client.close();
    console.log(result);
    socket.emit("sendclientdata", result);
  }
}


io.on("connection", function(socket){
  socket.on("getwindowlocation", function(jsonOfUrlsToSearch){
    console.log(jsonOfUrlsToSearch);
    locateOneByQuery(socket, jsonOfUrlsToSearch);
  });
  socket.on("suggesturl", function(windowlocation){
    emailSuggestion(socket, windowlocation);
  });
});


var listener = httpServer.listen(port, () => {
  console.log("Your app is listening on port " + listener.address().port);
});