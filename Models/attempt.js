import mongoose from "mongoose";
const attemptData = new mongoose.Schema({
  coursename: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  count: {
    type: String,
    required: true
  }
});
const attemptdata = mongoose.model("attempts", attemptData);

export default attemptdata;
