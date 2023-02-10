import Files from '../models/Files.js';
import fs from 'fs';
import mongoose from 'mongoose';

export const getFiles = async(req,res,next)=>{
    let File;
    try{
        File = await Files.find();
    }catch(err){
        console.log(err);
    }
    if(!Files){
        return res
        .status(404)
        .json({message:"File not Found.."})
    }
    return res
    .status(200)
    .json({File})
};

export const deleteFile = async(req,res,next)=>{
    let result  = await Files.findOne({_id: req.query.id});
    try{
        fs.unlink(__dirname + "/uploads/"+result.name, result.originalname);
    }catch(err){
        console.log(err);
    }return res
    .status(200)
    .json({meassge: "File Deleted!"})
}

export const updateFile = async(req,res)=>{

    let id = req.query.id;

    console.log(req.files.shubhi.name)

    const filename = Date.now() + "_" + req.files.shubhi.name;
    
    console.log(filename);
    const file = req.files.shubhi;
 
    let uploadPath = __dirname + "/uploads/" + filename;
    file.mv(uploadPath,(err)=>{
       if(err){
          return res.send(Err)
       }
    }); 
 
    
    var obj = {
       originalname: req.files.shubhi.name,
       name: filename
    }
 
    Files.create(obj, (err, item) => {
       if (err) {
           console.log(err);
           res.send(402);
       }
       else {
           // item.save();
           
       }
   });
    res.send(200);
 }