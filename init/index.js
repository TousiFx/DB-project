const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const MONGO_ULR = "mongodb://127.0.0.1:27017/ReserveFlow";

main()
  .then(() => {
    console.log("conneted to DB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_ULR);
}

const initDB = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(initData.data);
  console.log("data has inserted");
};
initDB();
