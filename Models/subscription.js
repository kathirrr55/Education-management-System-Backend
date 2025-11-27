import mongoose from "mongoose";

const productData = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  imageurl: {
    type: String,
    required: true
  },
  videourl: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  percentage: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
});
const subscriptiondata = mongoose.model("subscriptions", productData);

export default subscriptiondata;
