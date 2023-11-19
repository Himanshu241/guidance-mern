import mongoose from "mongoose";


const questionSchema = new mongoose.Schema({
  name:{
    type: String,
    required:true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  body: {
    type: String,
    required: true,
  },
  tags: [String],
  profileImage:String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  answers: [
    {
      body: String,
      name: String,
      profileImage: String,
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

// Create the Question model
const Question = mongoose.model('Question', questionSchema);

export default Question;
