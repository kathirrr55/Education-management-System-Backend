// Models/signup.js

import mongoose from "mongoose";
// Define the schema
const signupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true, // ensure no duplicate emails
      lowercase: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ // basic email validation
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    address: {
      type: String,
      required: true
    },
    mobile: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/ // ensures 10-digit numbers
    }
  },
  {
    timestamps: true // adds createdAt and updatedAt
  }
);

// Hash password before saving
// signupSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//   }
//   next();
// });

// Create model
const Signup = mongoose.model("users", signupSchema);

export default Signup;



// import mongoose from "mongoose";
// const signupData = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true
//   },
//   password: {
//     type: String,
//     required: true
//   },

//   address: {
//     type: String,
//     required: true
//   },
//   mobile: {
//     type: String,
//     required: true
//   }
// });
// //userdetail is the modelname.using these userdetail we can able to create,read,update,delete datas in userdetails collection
// const signup = mongoose.model("users", signupData);

// export default signup;
