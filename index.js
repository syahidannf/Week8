const express = require("express");
const app = express();
const pool = require("./config.js");
const router = require("./query.js");

pool.connect((err, res) => {
  if (err) console.log(err);
  console.log("connected");
});

app.use(express.json());

app.use(router);

app.listen(3000);
