import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import fileUpload from "express-fileupload";
import path from 'path';
import Files from './models/Files.js';
import fs from 'fs';
import router from "./routes/file-routes.js";
import userRouter from "./routes/user-routes.js";
import dotenv from 'dotenv';
import Users from "./models/Users.js";

const app = express();

app.use(cors({
   origin: "*"
}));
app.use(
   express.urlencoded({ extended: true })
);
app.use(express.json());
app.use(express.static("files"));
app.use(fileUpload())
app.use('/files', router);
app.use('/authen',userRouter);

const __dirname = path.resolve();

app.get('/', (req, res) => {
   Files.find({}, (err, items) => {
       if (err) {
           console.log(err);
           res.status(500).send('An error occurred', err);
       }
       else {
           res.render('imagesPage', { items: items });
       }
   });

});

app.get('/file', async (req, res) => {
   let result  = await Files.findOne({_id: req.query.id});
   console.log("________________________")
   console.log(result);
   console.log(result.name);
   console.log(result.originalname);
   console.log("________________________")
   res.download(__dirname + "/uploads/"+result.name, result.originalname);

   // res.pipe(fs.createWriteStream(__dirname + "/uploads/"+result.name))
   //       .on('error', reject)
   //       .once('close', () => resolve(__dirname + "/uploads/"+result.name));

})

function between(min, max) {  
   return Math.floor(
     Math.random() * (max - min) + min
   )
 }
const num = between(10, 200);
 console.log(num);
 
app.post('/',(req,res)=>{

   console.log(req.files.shubhi.name)
   console.log("______________")
   console.log(req.files);
   console.log("______________")
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
})

mongoose.connect(
    'mongodb://localhost:27017/Dropbox'
    )
    .then(()=>app.listen(5000))
    .then(()=>
       console.log("Connected,Listening on port 5000")
    )
    .catch((err) => console.log(err));

