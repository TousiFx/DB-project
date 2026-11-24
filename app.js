const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");

const MONGO_ULR = "mongodb://127.0.0.1:27017/ReserveFlow";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.engine("ejs", engine);

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

app.get("/listing/new", (req, res) => {
  res.render("new");
});

app.get("/listing", async (req, res) => {
  const allList = await Listing.find({});
  res.render("index", { allLists: allList });
});
app.get("/listing/:id/page", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("page", { listing });
});

app.get("/listing/:id/edit", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("edit", { listing });
});

app.put("/listing/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(
    id,
    { ...req.body.listing },
    { runValidators: true },
  );
  res.redirect(`/listing/${id}/page`);
});

app.delete("/listing/:id", async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect(`/listing`);
});

app.post("/listing", async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing
    .save()
    .then(() => {
      res.redirect("/listing");
    })
    .catch((err) => {
      err;
    });
});

app.listen(8080, () => {
  console.log("server is listing to port 8080");
});
