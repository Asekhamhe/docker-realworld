const express = require("express");
const axios = require("axios");

const { port, host, db, ApiUrl } = require("./config");
const { connectDb } = require("./helper/db");

const app = express();

app.get("/docker", (req, res) => {
  res.send("Our auth server is working correctly");
});

app.get("/api/currentUser", (req, res) => {
  res.json({
    id: "123",
    email: "foo@email.com",
  });
});

app.get("/auth-test-api", (req, res) => {
  axios.get(`${ApiUrl}/test-api-data`).then((response) => {
    res.json({
      currentUserFromApi: response.data,
    });
  });
});

const startServer = () => {
  app.listen(port, () => {
    console.log(`Started auth service on ${port}`);
    console.log(`Our host is ${host}`);
    console.log(`Database url ${db}`);
  });
};

connectDb()
  .on("error", console.log)
  .on("disconnected", connectDb)
  .once("open", startServer);
