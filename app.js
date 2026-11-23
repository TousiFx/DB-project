const express = require("express");
const app = express();
const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
}

app.get("/", (req, res) => {
  res.send("Welcome to home page");
});

app.listen(8080, () => {
  console.log("server is listing to port 8080");
});
