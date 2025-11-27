import express from "express";
import {
  addAttempt,
  addCourse,
  addQuiz,
  addSubscription,
  createAccount,
  deletecourse,
  deletequiz,
  getAllCourses,
  getAllLearningHistory,
  getAllQuizs,
  getAttemptCount,
  getMySubscription,
  getSubQuizs,
  updateAttempt,
  updateCourse,
  updateQuiz,
  updateSubscriptionStatus,
  userLogin
} from "../Controllers/userController.js";
const router = express.Router();
router.post("/createaccount", createAccount);
router.post("/addcourse", addCourse);
router.post("/addsubscription", addSubscription);
router.post("/addquiz", addQuiz);
router.post("/addattempt", addAttempt);
router.get("/getattemptcount", getAttemptCount);
// router.get("/userlogin", userLogin);
router.post("/userlogin", userLogin);
router.get("/getallcourses", getAllCourses);
router.get("/getmysubscription", getMySubscription);
router.get("/getallquizs", getAllQuizs);
router.get("/getsubquizs", getSubQuizs);
router.get("/learning", getAllLearningHistory);
router.put("/updateattempt", updateAttempt);
router.put("/editcourse", updateCourse);
router.put("/editquiz", updateQuiz);
router.put("/updatesubscriptionstatus", updateSubscriptionStatus);
router.delete("/deletecourse", deletecourse);
router.delete("/deletequiz", deletequiz);

export default router;
