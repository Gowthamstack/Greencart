//login /api/seller/login

import jwt from "jsonwebtoken";
import 'dotenv';


export const sellerLogin=async(req,res)=>{
   
    try {
       const {email,password}=req.body;
       console.log(email);
       console.log(password);
      if( process.env.SELLER_EMAIL == email && process.env.SELLER_PASSWORD == password){

        const Token=jwt.sign({email},process.env.JWT_SECRET, {
      expiresIn: '7d'})
        res.cookie('sellerToken',Token,{
          httpOnly:true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })

    
        res.json({success:true,message:"Hi Admin Your Authorized"});
      }
      else{
        res.json({success:false,message:"Not Authorized"})
      }
    } catch (error) {
      console.log(error.message);
      res.json({success:false,message:"Invalid Credentials"});
    }
}




//check Auth  :/api/seller/is-auth

export const isSellerAuth=async(req,res)=>{
    try{   
      return res.json({success:true});
    }catch(error){
      console.log(error.message);
      res.json({success:false,message:error.message});
    }
}


//logout user :/api/seller/logout
export const sellerLogout = async (req, res) => {
  try {
    res.clearCookie('sellerToken',{
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "prodction" ? "none" : "strict",
  })
    return res.json({success:true,message:"Logged Out"})
  } 
  catch (error) {
     console.log(error.message);
    res.json({success:false,message:error.message});
  }
};
