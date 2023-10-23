import express from 'express';
import mongoose from 'mongoose';
import bodyParser  from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from './models/user.js';
import jwt from 'jsonwebtoken'
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const bcrypt = require('bcrypt');
// const User = require('./models/user');

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
    const token = await jwt.sign({ email: user.email },process.env.JWT_SECRET);
    console.log(token)
    delete user.password;
    res.status(200).json({ token,user});
  });

  

 


/* MONGOOSE SETUP */
const PORT = process.env.PORT;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, ()=> console.log(`server started on port ${PORT}` ))
   
}).catch((error)=> {console.log(`${error} could not connect to database`)});