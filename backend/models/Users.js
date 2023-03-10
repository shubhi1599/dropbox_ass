import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true, 
        minlength: 5 
    },
    name: { 
        type: String,
        required: true 
    }
});

export default mongoose.model('Users', userSchema);