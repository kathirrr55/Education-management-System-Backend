// Controllers/userController.js

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import categorydata from "../Models/product.js";
import signup from "../Models/signup.js";
import subscriptiondata from "../Models/subscription.js";

import quizdata from "../Models/quiz.js";
import attemptdata from "../Models/attempt.js";

const saltRounds = 10;

// ======================== JWT Verification Middleware ========================
const verifyJWT = (req, res, next) => {
  // ✅ Use Authorization header (Bearer token) for security instead of cookie
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ auth: false, message: "Token required" });

  jwt.verify(token, "jwt-Secret-key", (err, decoded) => {
    if (err) return res.status(401).json({ auth: false, message: "Invalid token" });
    req.userId = decoded.id;
    next();
  });
};

// ======================== CREATE ACCOUNT ========================
const createAccount = async (req, res) => {
  try {
    const { username, email, password, address, mobile } = req.body;

    // ✅ Check if user already exists
    const existingUser = await signup.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ status: 400, message: "Email already registered" });
    }

    // ✅ Directly save plain password (for testing only)
    const userdata = new signup({
      name: username,
      email: email,
      password: password, // no hashing
      address: address,
      mobile: mobile,
    });

    await userdata.save();
    res.status(200).json({ status: 200, message: "Account Created Successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 500, message: "Server error. Please try again later." });
  }
};

// const createAccount = asyncHandler(async (req, res) => {
//   const { username, email, password, address, mobile } = req.body;

//   // Check if already registered
//   const existingUser = await signup.findOne({ email });
//   if (existingUser) {
//     return res.status(400).json({ status: 400, message: "Email already registered" });
//   }

//   // Hash password before saving
//   const hashedPassword = await bcrypt.hash(password, 10);

//   const userdata = new signup({
//     name: username,
//     email: email,
//     password: hashedPassword,
//     address: address,
//     mobile: mobile
//   });

//   await userdata.save();
//   res.status(200).json({ status: 200, message: "Account Created Successfully" });
// });

// ======================== USER LOGIN ========================
  const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await signup.findOne({ email });
    if (!user) {
      return res.status(400).json({ status: 400, message: "User not found!" });
    }

    // ✅ Directly compare plain text passwords
    if (user.password !== password) {
      return res.status(400).json({ status: 400, message: "Wrong password!" });
    }

    res.status(200).json({ status: 200, message: "Login successful", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 500, message: "Server error. Please try again later." });
  }
};


//   const userLogin = asyncHandler(async (req, res) => {
//   console.log("------ LOGIN REQUEST RECEIVED ------");
//   console.log("Request Body:", req.body);

//   const { email, password } = req.body;

//   // 1️⃣ Check if user exists
//   const user = await signup.findOne({ email });
//   if (!user) {
//     console.log("❌ User not found!");
//     return res.status(400).json({ auth: false, message: "User not found" });
//   }

//   console.log("✅ User found:", user.email);

//   // 2️⃣ Compare password (typed one vs hashed one in DB)
//   const isMatch = await bcrypt.compare(password, user.password);
//   console.log("Password Match Result:", isMatch);

//   // 3️⃣ Stop here if wrong password
//   if (!isMatch) {
//     console.log("❌ Wrong password entered!");
//     return res.status(401).json({ auth: false, message: "Wrong password!" });
//   }

//   // 4️⃣ Generate token if login successful
//   const token = jwt.sign(
//     { id: user._id, email: user.email },
//     "jwt-Secret-key",
//     { expiresIn: "1h" }
//   );

//   console.log("✅ Token generated successfully");

//   // 5️⃣ Send success response
//   return res.status(200).json({
//     auth: true,
//     message: "Login successful!",
//     token,
//     user: {
//       id: user._id,
//       name: user.name,
//       email: user.email,
//       address: user.address,
//       mobile: user.mobile
//     }
//   });
// });

// ======================== COURSE FUNCTIONS ========================
const getAllCourses = asyncHandler(async (req, res) => {
  const productData = await categorydata.find({});
  res.status(200).send(productData);
});

const addCourse = asyncHandler(async (req, res) => {
  const { name, imageurl, videourl, price, description, category } = req.body;

  const productdetails = new categorydata({ name, imageurl, videourl, price, description, category });
  await productdetails.save();
  res.status(200).json({ status: 200, message: "Course Added Successfully" });
});

const updateCourse = asyncHandler(async (req, res) => {
  const { id, productname, imageurl, videourl, price, description, category } = req.body;
  await categorydata.updateOne({ _id: id }, {
    $set: { name: productname, imageurl, videourl, price, description, category }
  });
  res.status(200).json({ status: 200, message: "Course Updated Successfully" });
});

const deletecourse = asyncHandler(async (req, res) => {
  const { id } = req.query;
  await categorydata.deleteOne({ _id: id });
  res.status(200).json({ status: 200 });
});

// ======================== SUBSCRIPTION FUNCTIONS ========================
const addSubscription = asyncHandler(async (req, res) => {
  const { name, imageurl, videourl, price, description, category, email, percentage, status } = req.body;
  const productdetails = new subscriptiondata({ name, imageurl, videourl, price, description, category, email, percentage, status });
  await productdetails.save();
  res.status(200).json({ status: 200, message: "Subscription Added Successfully" });
});

const updateSubscriptionStatus = asyncHandler(async (req, res) => {
  const { id, status } = req.body;
  await subscriptiondata.updateOne({ _id: id }, { $set: { percentage: "100", status } });
  res.status(200).json({ status: 200, message: "Course Completed Successfully" });
});

const getMySubscription = asyncHandler(async (req, res) => {
  const { email, status } = req.query;
  const productData = await subscriptiondata.find({ email: email, status: status });
  res.status(200).send(productData);
});

const getAllLearningHistory = asyncHandler(async (req, res) => {
  const productData = await subscriptiondata.find({});
  res.status(200).send(productData);
});

// ======================== QUIZ FUNCTIONS ========================
const getAllQuizs = asyncHandler(async (req, res) => {
  const quizData = await quizdata.find({});
  res.status(200).send(quizData);
});

const getSubQuizs = asyncHandler(async (req, res) => {
  const { name } = req.query;
  const quizData = await quizdata.find({ name });
  res.status(200).send(quizData);
});


const addQuiz = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      imageUrl,
      description,
      no_of_questions,
      passmark,
      totalmark,
      questions,
      creationDate,
      createdBy,
    } = req.body;

    // ✅ Validate required fields
    if (!name || !imageUrl || !description || !passmark || !totalmark || !questions) {
      return res.status(400).json({ status: 400, message: "Please fill all fields" });
    }

    // ✅ Map questions properly
    const formattedQuestions = questions.map((q) => ({
      question: q.question,
      options: Array.isArray(q.options)
        ? q.options
        : q.options.split(",").map((opt) => opt.trim()),
      correct_option: q.correct_option,
    }));

    // ✅ Save new quiz
    const newQuiz = new quizdata({
      name,
      imageUrl,
      description,
      no_of_questions,
      passmark,
      totalmark,
      questions: formattedQuestions,
      creationDate,
      createdBy,
    });

    await newQuiz.save();

    res.status(200).json({ status: 200, message: "Quiz Added Successfully" });
  } catch (error) {
    console.error("❌ Error while adding quiz:", error);
    res.status(500).json({ status: 500, message: "Server error while saving quiz" });
  }
});


const updateQuiz = asyncHandler(async (req, res) => {
  const { id, ...rest } = req.body;
  await quizdata.updateOne({ _id: id }, { $set: rest });
  res.status(200).json({ status: 200, message: "Quiz Updated Successfully" });
});

const deletequiz = asyncHandler(async (req, res) => {
  const { id } = req.query;
  await quizdata.deleteOne({ _id: id });
  res.status(200).json({ status: 200 });
});

// ======================== ATTEMPT FUNCTIONS ========================
const addAttempt = asyncHandler(async (req, res) => {
  const attemptdetails = new attemptdata(req.body);
  await attemptdetails.save();
  res.status(200).json({ status: 200, message: "Attempt Recorded Successfully" });
});

const getAttemptCount = asyncHandler(async (req, res) => {
  const { email, coursename } = req.query;
  const productData = await attemptdata.find({ email, coursename });
  res.status(200).send(productData);
});

const updateAttempt = asyncHandler(async (req, res) => {
  const { id, ...rest } = req.body;
  await attemptdata.updateOne({ _id: id }, { $set: rest });
  res.status(200).json({ status: 200, message: "Attempt Count Updated Successfully" });
});

// ======================== EXPORT ========================
export {
  verifyJWT,
  createAccount,
  userLogin,
  getAllCourses,
  getAllLearningHistory,
  getMySubscription,
  addCourse,
  updateCourse,
  deletecourse,
  addSubscription,
  updateSubscriptionStatus,
  getAllQuizs,
  getSubQuizs,
  addQuiz,
  updateQuiz,
  deletequiz,
  addAttempt,
  getAttemptCount,
  updateAttempt
};

