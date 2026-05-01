//cod /api/orde/cod

import Orders from "../models/order.js";
import Product from "../models/Product.js";
import stripe from "stripe";
import User from '../models/User.js'

export const placeCOD=async(req,res)=>{
    try{
        const {userId,items,address}=req.body;
        if(!address || items.length==0){
            res.json({success:false,message:"INValid Data"})
        }
        let amount=await items.reduce(async(acc,item)=>{
            const product=await Product.findById(item.product);
            return await(acc)+product.offerprice * item.quantity;
        },0)
        //Add Charges Tax

        amount+=Math.floor(amount * 0.02);

        await Orders.create({
            userId,
            items,
            address,
            amount,
            paymentType:'COD'
        })

        return res.json({success:true,message:"Order Placed SuccesFully"});

    }catch(error){
        console.log(error.message);
       return res.json({success:false,message:error.message});
        
    }
}

// :api/orders/stripe

export const placeOrderStripe=async(req,res)=>{
    try {
        const {userId,items,address}=req.body;

        const {origin}=req.headers;

        if(!address || items.length==0){
            return res.json({success:false,message:"InValid Data"});
        }

        let productData=[];

        let amount = await items.reduce(async,(acc,item)=>{
            const {product}=await Product.findById(item.product);

            productData.push({
                name:product.name,
                price:product.offerPrice,
                quantity:product.quantity
            })

            return (await acc) + product.offerPrice * item.quantity;
        },0)

        amount += Math.floor(amount * 0.02);

        const order = await  Orders.create({
            userId,
            items,
            address,
            amount,
            paymentType:'Online'
        })

        //Stripe Intialize

        const StripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)

        // create line items for stripe

        const line_items = productData.map((item)=>{
            return {
                price_data:{
                    currency:'usd',
                    product_data :{
                        name:item.name
                    },
                    unit_amount :Math.floor(item.price + item.price * 0.02) * 100
                },
                quantity:item.quantity,
            }
        })

        const session =await StripeInstance.checkout.sessions.create({
            line_items,
            mode:"payment",
            success_url:`${origin}/loader?next=my-orders`,
            cancel_url:`${origin}/cart`,
            metadata:{
                orderId : order._id.toString(),
                userId,
            }
        })

        return res.json({success:true,url:session.url });

    } catch (error) {
        return res.json({success:false,message:error.message});
    }
}


//Stripe webHooks to verify payments action :/stripe

export const stripeWebHooks=async(request,response)=>{
    const StripeInstance =new stripe(process.env.STRIPE_SECRET_KEY);

    const sig = request.headers["stripe-signature"];

    let event;
    try {
        event = StripeInstance.webhooks.constructEvent(
            request.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET);
    } catch (error) {
        response.status(400).send(`WebHook Error: ${error.message}`)
    }

    switch(event.type){
        case "payment_intent.succeeded":{
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            //Getting session metadata

            const session = await StripeInstance.checkout.sessions.list({
                payment_intent:paymentIntentId,
            })

            const {orderId,userId}=session.data[0].metadata;

            await Orders.findByIdAndUpdate(orderId,{isPaid:true})

            await User.findByIdAndUpdate(userId,{cartItems:{}})

            break;
        }

        case "payment_intent.payment_failed":{

            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            const session = await StripeInstance.checkout.sessions.list({
                payment_intent:paymentIntentId
            })

            const {orderId} =session.data[0].metadata;

            await Orders.findByIdAndDelete(orderId)

            break;
        }
            
        default:
            console.error(`UnHandles Event Type ${event.type}`);
            break;
    }

    response.json({received:true})

}


//Get ORDERS By user id   //api/order/user

export const getUserOrders=async(req,res)=>{
    try {
        const {userId}=req.body;
        const orders=await Orders.find({
            userId,
            $or : [{paymentType:"COD"},{isPaid:true}]
        }).populate("items Product address").sort({createdAt:-1})
        res.json({sucsess:true,orders})
    } catch (error) {
        return res.json({success:false,message:error.message});
    }
}

//get all order api/order/seller

export const getAllOrders=async(req,res)=>{
     try {
        const orders=await Orders.find({
            $or : [{paymentType:"COD"},{isPaid:true}]
        }).populate("items Product address").sort({createdAt:-1});
        res.json({sucsess:true,orders})
    } catch (error) {
        return res.json({success:false,message:error.message});
    }
}
