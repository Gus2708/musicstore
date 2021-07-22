const express = require("express");
const Stripe = require('stripe');
const cors = require("cors");

const app = express();

const stripe = Stripe('sk_test_51J5Qv2IXbsEAIaUd9dg1LEEDpejaaLEGX0JYmThARzqREV60r18oF5Ltb3DS1sOO0BVMAHfESo2Vxwu9VFyln2Rr00OQOY6t5N');

// middleware

app.use(cors({
    origin: "http://localhost:3000"},
    ));
app.use(express.json());

app.post("/api/checkout", async (request, response) => {
    const { id, amount } = request.body;
    try{
        const payment =  await stripe.paymentIntents.create({ 
            amount: amount,
            currency: "EUR",   
            payment_method_types: ["card"],       // esto deben agregar,  especifica el "método de pago"
            description: "Basket of products",
            payment_method: id,
            confirm: true,
        }); 
        console.log(payment); 
        return response.status(200).json({message: "Succesfull payment"});
    }catch(error){
        console.log(error);
        return response.json({ message: error.raw.message });
    }
});

app.listen(3001, () => console.log("Server Listening Port", 3001));
