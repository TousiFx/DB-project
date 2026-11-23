const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");

const MONGO_ULR = "mongodb://127.0.0.1:27017/ReserveFlow";

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

app.get("/test", async (req, res) => {
  let sampleListing = new Listing({
    title: "Holy Villa",
    description: "near the beach",
    price: 199,
    location: "Panjim,goa",
    country: "India",
  });
  await sampleListing.save();
  console.log("sample was saved");
  res.send("Successful testing");
});

app.listen(8080, () => {
  console.log("server is listing to port 8080");
});
