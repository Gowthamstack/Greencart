import jwt from "jsonwebtoken";
import 'dotenv'

const authUser=async(req,res,next)=>{
    const {token}=req.cookies;    
    
    
    if(!token){
        return res.status(401).json({success:false,message:"Not Authorized"});
    }
    
    try {
        const tokenDecode=jwt.verify(token,process.env.JWT_SECRET);
        if(tokenDecode.id){
            req.userId= tokenDecode.id;
        }
        else{
            return res.json({success:false,message:"User Not Authorized"});
        }
        next();
    } catch (error) {
        res.json({success:false,message:"Not Authorized"});
    }
}

export default authUser;