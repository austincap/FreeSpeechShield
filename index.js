// init project
const express = require("express"); // the library we will use to handle requests
const { MongoClient } = require("mongodb"); // load mongodb
const port = 4567; // port to listen on
const app = express(); // instantiate express
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);



app.use(require("cors")()); // allow Cross-domain requests
app.use(require("body-parser").json()); // automatically parses request data to JSON
app.use(express.static(__dirname));
// make sure in the free tier of MongoDB atlas when connecting, to
// select version 2.2.* as the node.js driver instead of the default 3.0
// put your URI HERE ⬇
const uri = "mongodb+srv://randomuser:fucksluts@freespeechshieldcluster.8apgw.mongodb.net";
// Create a new MongoClient
const client = new MongoClient(uri, {useNewUrlParser:true, useUnifiedTopology:true});

async function run() {
  var siteDocument = {};
  try {
    // Connect the client to the server
    await client.connect();
    var database = await client.db("DatabaseOfSites");
    var DoSCollection = await database.collection("DatabaseOfSites");
    // Establish and verify connection
    await client.db("DatabaseOfSites").command({ ping: 1 });
    console.log("Connected successfully to server");
    // // Query for a movie that has the title 'The Room'
    var query = await { url: "facebook.com" };
    var options = await {
    //   // sort matched documents in descending order by rating
       sort: { rating: -1 }
    //   // Include only the `title` and `imdb` fields in the returned document
    //   //projection: { _id: 0, title: 1, imdb: 1 },
    };
    siteDocument = await DoSCollection.findOne(query, options);
    // since this method returns the matched document, not a cursor, print it directly
    console.log(siteDocument.url);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
    return siteDocument.url;
  }
}



    // server-side
	io.on("connection", function(socket){
	  console.log(socket.id); // ojIckSD2jqNzOqIrAGzL
	  socket.on("getwindowlocation", function(message){
	  	console.log(message);
	  });
	});

    // if someone goes to base route, send back they are home.
    app.get("/", (req, res) => {
      //res.send("You are home 🏚.");
      var test = "you are";
      console.log("you are");
      console.log(req);
      res.send(test);
  //     try{
		// test = run();
  //     }finally{
  //       res.send(test);
  //     } 
    });

  // listen for requests
  var listener = httpServer.listen(port, () => {
    console.log("Your app is listening on port " + listener.address().port);

  });

