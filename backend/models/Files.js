import mongoose from "mongoose";
 
var fileSchema = new mongoose.Schema({
    originalname: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    // users:{
    //     type: mongoose.Types.ObjectId,
    //     ref: "Users",
    //     required: true
    // }
});
 
//Image is a model which has a schema imageSchema
 
export default mongoose.model('Files', fileSchema);