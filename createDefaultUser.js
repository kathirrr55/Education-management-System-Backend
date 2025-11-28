// createDefaultUser.js

import mongoose from "mongoose";
// import bcrypt from "bcrypt";
import Signup from "./Models/signup.js"; // adjust path if needed
import dotenv from "dotenv";
     
dotenv.config();

const createDefaultUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");

    // ✅ CHANGE these to your new username/email/password
    const email = "newuser@gmail.com";  
    const password = "newpassword123";  
    const name = "New Demo User";

    // Check if user already exists
    const existingUser = await Signup.findOne({ email });
    if (existingUser) {
      console.log("User already exists, updating password...");
      // const hashedPassword = await bcrypt.hash(password, 10);
      existingUser.password = hashedPassword;
      existingUser.name = name; // update name too
      await existingUser.save();
      console.log("User updated successfully");
      process.exit(0);
    }

    // Hash password
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new Signup({
      name,
      email,
      password: hashedPassword,
      address: "User Address",
      mobile: "9876543210",
    });

    await newUser.save();
    console.log("Default user created successfully");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

createDefaultUser();
