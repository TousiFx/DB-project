const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");

const MONGO_ULR = "mongodb://127.0.0.1:27017/ReserveFlow";
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

main()
  .then(() => {
    console.log("conneted to DB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_ULR);
}

app.get("/", (req, res) => {
  res.send("Welcome to home page");
});

app.get("/listing", async (req, res) => {
  const allList = await Listing.find({});
  res.render("index", { allLists: allList });
});

app.listen(8080, () => {
  console.log("server is listing to port 8080");
});
