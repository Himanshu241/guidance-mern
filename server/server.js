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
import multer from 'multer';
import Pdf from './models/pdf.js';


//configurations
dotenv.config();
const app = express();
app.use(express.json({limit: '50mb'}));
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use('/uploads', express.static('uploads'));
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const storageProfile = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

const uploadProfile = multer({ storage: storageProfile });



//route with pdf upload
app.post('/:id/upload',verifyToken, upload.array('pdf', 5), async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)

    const pdfs = req.files;

    if (!pdfs || pdfs.length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    const uploadPromises = pdfs.map(async (pdf) => {
      const { originalname, buffer } = pdf;
      const newPdf = new Pdf({
        id: id,
        fileName: originalname,
        data: buffer,
      });
      await newPdf.save();
    });

    await Promise.all(uploadPromises);

    res.status(201).send('PDFs uploaded successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
// Route to update user
// Update user by ID
app.put('/users/:id', verifyToken, uploadProfile.single('profileImage'), async (req, res) => {
  const userId = req.params.id;
  const updateData = req.body;

  try {
    // If a profile image is uploaded, update the profileImage field with the file path
    if (req.file) {
      const filename = req.file.filename;
      
      console.log(req.file)
      // File has been written to the 'uploads' folder
      updateData.profileImage = `/uploads/${filename}`;
    }

    // Find the user by ID and update the fields
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

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
    const token = await jwt.sign({ userId: user.userId },process.env.JWT_SECRET);
    console.log(token)
    delete user.password;
    res.status(200).json({ token,user});
  });

  app.post('/question',verifyToken, async(req, res)=>{
    try{
        const {name, title, body, tags, createdBy,profileImage, isMentor} = req.body;
        const tagsList = tags.split(',');
        console.log(tagsList)
        const newQuestion =await new Question({name, title, body, tags:tagsList, createdBy,profileImage:profileImage, isMentor:isMentor});
        const response = await newQuestion.save()
        console.log(response);
        res.status(200).json({newQuestion});
    }
    catch(error){
      console.error('Error saving question:', error);
    }
}
    );
  app.get('/getQuestions',verifyToken, async(req, res)=>{
    try {
        const questions = await Question.find();
        
        res.json(questions);
    } catch (error) {
        console.log(error.message);
    }
  })

 app.post('/question/:id/answer',verifyToken, async(req,res)=>{
  try {
    const { id } = req.params;
    const { body, name, createdBy, profileImage, isMentor:isMentor} = req.body;

    const question = await Question.findById(id);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    const newAnswer = {
      body,
      name,
      createdBy,
      profileImage,
      isMentor
    };
    

    question.answers.push(newAnswer);
    await question.save();

    res.status(201).json({ message: 'Answer added successfully', newAnswer });
  } catch (error) {
    console.error('Error adding answer:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
    
});

app.get('/:searchTerm/search',verifyToken, async (req, res) => {
  try {
    const {searchTerm} = req.params;
    console.log(searchTerm);

    // Perform the search
    const results = await Question.find({
      $or: [
        { title: { $regex: searchTerm, $options: 'i' } }, // 'i' for case-insensitive
        { body: { $regex: searchTerm, $options: 'i' } },
      ],
    }).exec();

    res.json(results);
    console.log(results)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/questions/:name',verifyToken, async (req, res) => {
  try {
    const questions = await Question.find({ name: req.params.name });
   
    if (questions.length === 0) {
      return res.status(404).json({ message: 'No questions found with the specified name.' });
    }

    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get('/searchMentor',verifyToken, async (req, res) => {
  const { query } = req.query;

  try {
    // Use a regex for case-insensitive partial matching
    const users = await User.find({ 
      $and: [
          { 
              occupation: { 
                  $regex: new RegExp(query, 'i') 
              } 
          },
          {
              isMentor: true
          }
      ]
  });

    res.json(users);
  } catch (error) {
    console.error(error);
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