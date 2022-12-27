const express = require('express');

const router = express.Router();
const User = require('../Models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const validationSchema = require('../Validation')


router.post('/signup',async (req,res)=>{
    console.log(req.body);
    const { FirstName,LastName,Email,Password } = req.body;
    try{
        
        if(FirstName.length===0 || LastName.length === 0 || Email.length === 0 || Password.length === 0){
            return res.status(401).json({ Message: " Reuired Fields are missing" })
        }else if(!Email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )){
            return res.status(401).json({ Message: "Email Should be in correct Format" })
          }else if(!Password.match(/^[a-zA-Z0-9_]*$/)||!Password.length>=8){
            return res.status(401).json({ Message: "Password Should be in correct Format" })
          }
         

       
    

    }
    catch(error){
          return res.status(401).json({ Message:"Reuired Fields are missing" })
    }
    
    try {

        const existingCheck = await User.findOne({
            Email:Email
        })
        if(existingCheck){
            return res.json({ Message:" User Already Existed" })
        }else{
    
            const hash = await bcrypt.hash(Password,10);
    
        await User.create({
            FirstName,
            LastName,
            Email,
            Password:hash
    
         })
          return res.status(200).json({ Message:"SignUp Completed " })

        }
       


        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ Message:"Sometjing went wrong" })
    }
   
    

   
})




router.post('/login',async (req,res)=>{
    console.log(req.body);
    try{
         const { Email,Password } = req.body;

         const checkExistence= await User.findOne({ Email });
         if(!checkExistence){
            return res.status(401).json({ Message:"UserName or Password is Worng" });
         } 
         else{
            const hashCompare = await bcrypt.compare(Password,checkExistence.Password);
            
            if(hashCompare){
                const token = jwt.sign({
                   FirstName:checkExistence.FirstName,
                   LastName:checkExistence.LastName,
                   Id:checkExistence.id,
                  }, 'secret', { expiresIn: '1h' });

                return res.status(200).json({ Message:" Login Done " , Token: token })  
            }
            else{
                return res.status(401).json({ Message:"UserName or Password is Worng" })
            }
         }
    }
    catch(error){
          console.log(error);
          return res.status(500).json({ Message:"Somrthing Went Worong" })
    }
})











module.exports = router