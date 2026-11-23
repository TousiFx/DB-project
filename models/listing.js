const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1779642472369-19ea57235a90?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D";

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    default: DEFAULT_IMAGE,
    set: (v) => (typeof v === "object" ? v?.url : v) || DEFAULT_IMAGE,
  },
  price: {
    type: Number,
    min: 0,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
