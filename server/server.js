import express from 'express';
import mongoose from 'mongoose';
import bodyParser  from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from './models/user.js';
import jwt from 'jsonwebtoken'
import Question from './models/question.js';
import { verifyToken } from './middleware/auth.js';


//configurations
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
//POST Routes
app.post("/register",async (req, res)=>{
    try{
        
        const { name, email, password, occupation } = req.body;
        
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        
        const newUser =await new User({ name, email, password:passwordHash, occupation });


        const response = await newUser.save();
        console.log(response)
        if(response )  {
            console.log('user saved successfully')
            res.status(200).json(response);
        }
        
    }
    catch(error){
        res.status(500).json({error : error.message})
    }
});
app.post('/login', async (req, res) => {
    
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user)
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate and send a JWT token
    const token = await jwt.sign({ userId: user.userId },process.env.JWT_SECRET,{ expiresIn: '1h' });
    console.log(token)
    delete user.password;
    res.status(200).json({ token,user});
  });

  app.post('/question', async(req, res)=>{
    try{
        const {name, title, body, tags, createdBy} = req.body;
        const tagsList = tags.split(',');
        console.log(tagsList)
        const newQuestion =await new Question({name, title, body, tags:tagsList, createdBy});
        const response = await newQuestion.save()
        .then(question => {
        console.log('Question saved:', question);
    })
    }
    catch(error){
      console.error('Error saving question:', error);
    }
}
    );
  app.get('/getQuestions',async(req, res)=>{
    try {
        const questions = await Question.find();
        
        res.json(questions);
    } catch (error) {
        console.log(error.message);
    }
  })

 app.post('/question/:id/answer', async(req,res)=>{
  try {
    const { id } = req.params;
    const { body, name, createdBy } = req.body;

    const question = await Question.findById(id);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    const newAnswer = {
      body,
      name,
      createdBy,
    };
    console.log(newAnswer)
    console.log(id)

    question.answers.push(newAnswer);
    await question.save();

    res.status(201).json({ message: 'Answer added successfully', newAnswer });
  } catch (error) {
    console.error('Error adding answer:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
    
});


/* MONGOOSE SETUP */
const PORT = process.env.PORT;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, ()=> console.log(`server started on port ${PORT}` ))
   
}).catch((error)=> {console.log(`${error} could not connect to database`)});