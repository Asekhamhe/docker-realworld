const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");

const { port, host, db, authApiUrl } = require("./config");
const { connectDb } = require("./helper/db");

const app = express();

const kittenSchema = new mongoose.Schema({
  name: String,
});

const Kitten = new mongoose.model("Kitten", kittenSchema);

app.get("/docker", (req, res) => {
  ``;
  res.send(`Our api server is working correctly ${authApiUrl}`);
});

// auth service communication with api service
app.get("/api/test-api-data", (req, res) => {
  res.json({
    data: true,
  });
});

app.get("/testWithCurrentUser", (req, res) => {
  axios.get(`${authApiUrl}/currentUser`).then((response) => {
    res.json({
      testWithCurrentUser: true,
      currentUserFromAuth: response.data,
    });
  });
});

const startServer = () => {
  app.listen(port, () => {
    console.log(`Started api service on ${port}`);
    console.log(`Our host is ${host}`);
    console.log(`Database url ${db}`);
    console.log(`Auth api url ${authApiUrl}`);

    const silence = new Kitten({ name: "Silence" });
    silence.save((err, result) => {
      if (err) return console.log(err);
      console.log("result with volumes start", result);
    });
  });
};

connectDb()
  .on("error", console.log)
  .on("disconnected", connectDb)
  .once("open", startServer);
