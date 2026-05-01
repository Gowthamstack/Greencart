import Product from "../models/Product.js";
import {v2 as cloudinary} from 'cloudinary'

//addProduct  :api/product/add
export const addProduct=async(req,res)=>{
    try {
        let productData=JSON.parse(req.body.productData);
        const image=req.files;
         
        let  imagesUrl=await Promise.all(image.map(async (item) => {
            let result=await cloudinary.uploader.upload(item.path, {resource_type: "image"});
            return result.secure_url;
        }));

        await Product.create({...productData, image:imagesUrl}); 
        res.json({success:true,message:"Product Added Successfully"});
    } catch(error){
        console.log(error.message);
        res.json({success:false,message:error.message});
   }
}

//ProductList  :api/product/list
export const productList=async(req,res)=>{
    try{
        const products=await Product.find().sort({createdAt:-1});
        res.json({success:true,products})
    }catch(error){
        console.log(error.message);
        res.json({success:false,message:error.message});
    }
}

//get single  :api/product/:id
export const productById=async(req,res)=>{
    try{
        const {id}=req.body;
        const products=await Product.findById({});
        res.json({success:true,products})

    }catch(error){
         console.log(error.message);
        res.json({success:false,message:error.message});
    }
}


export const changeStock=async(req,res)=>{
     try{
        const{id,inStock}=req.body;
        await Product.findByIdAndUpdate(id,{inStock});
        res.json({success:true,message:"Stock Updated Successfully"})
     }catch(error){
        console.log(error.message);
        res.json({success:false,message:error.message});
     }
}


