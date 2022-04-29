const express = require("express");
const mongoose = require("mongoose");
const { port, host, db } = require("./configuration");
const { connectDb } = require("./helpers/db");
const app = express();
const postSchema = new mongoose.Schema({
  name: String
});
const Post = mongoose.model("Post", postSchema);

app.get("/test", (req, res) => {
  res.send("Our api server is working correctly");
});

const startServer = () => {
  app.listen(port, () => {
    console.log(`Started api service on port ${port}`);
    console.log(`Our host is ${host}`);
    console.log(`Our db ${db}`);

    const silence = new Post({name: "Silence"});
    silence.save(function(err, savedSilence) {
      if(err) return console.log(err);
      console.log("savedSilence with volumes!", savedSilence);
    });
  });
};

connectDb()
  .on("error", console.log)
  .on("disconnected", connectDb)
  .once("open", startServer);
