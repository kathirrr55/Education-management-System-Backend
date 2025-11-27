import mongoose from "mongoose";

// Sub-schema for a single question
const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true
  },
  options: [
    {
      type: String,
      required: true,
      trim: true
    }
  ],
  correct_option: {
    type: String,
    required: true,
    trim: true
  }
});

// Main quiz schema
const quizSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    no_of_questions: {
      type: Number,
      required: true
    },
    passmark: {
      type: Number,
      required: true
    },
    totalmark: {
      type: Number,
      required: true
    },
    questions: {
      type: [questionSchema], // array of question objects
      validate: [q => q.length > 0, "At least one question is required"]
    },
    creationDate: {
      type: Date,
      default: Date.now
    },
    createdBy: {
      type: String,
      required: true,
      trim: true
    }
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

// Create model
const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;


// import mongoose from "mongoose";
// const quizData = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   imageurl: {
//     type: String,
//     required: true
//   },
//   description: {
//     type: String,
//     required: true
//   },

//   no_of_questions: {
//     type: String,
//     required: true
//   },
//   passmark: {
//     type: String,
//     required: true
//   },
//   totalmark: {
//     type: String,
//     required: true
//   },
//   q1: {
//     type: String,
//     required: true
//   },
//   q1_options: {
//     type: String,
//     required: true
//   },
//   q1_correct_option: {
//     type: String,
//     required: true
//   },
//   q2: {
//     type: String,
//     required: true
//   },
//   q2_options: {
//     type: String,
//     required: true
//   },
//   q2_correct_option: {
//     type: String,
//     required: true
//   },
//   q3: {
//     type: String,
//     required: true
//   },
//   q3_options: {
//     type: String,
//     required: true
//   },
//   q3_correct_option: {
//     type: String,
//     required: true
//   },
//   q4: {
//     type: String,
//     required: true
//   },
//   q4_options: {
//     type: String,
//     required: true
//   },
//   q4_correct_option: {
//     type: String,
//     required: true
//   },
//   q5: {
//     type: String,
//     required: true
//   },
//   q5_options: {
//     type: String,
//     required: true
//   },
//   q5_correct_option: {
//     type: String,
//     required: true
//   },
//   creationdate: {
//     type: String,
//     required: true
//   },
//   createdby: {
//     type: String,
//     required: true
//   }
// });
// const quizdata = mongoose.model("quizs", quizData);

// export default quizdata;
