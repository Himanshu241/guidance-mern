import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true,
        min: 2,
        max: 50
    },
    
    email : {
        type: String,
        required : true,
        max: 50,
        unique: true
    },
    password:{
            type: String,
            required : true,
            min: 5, 
    },
    profileImage:String ,
    
    occupation: String,
    isMentor:{
        type:Boolean,
        default: false
    },
    bio:String
    

},
{timestamps : true}
);

const User = mongoose.model("User" , UserSchema);

export default User;