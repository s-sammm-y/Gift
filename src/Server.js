import twilio from 'twilio'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config();

const app = express();
const PORT = 5000

app.use(cors())
app.use(express.json());

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const MessagingServiceSid = process.env.MESSAGING_ID;
const toPhoneNumber = process.env.TO_PHONE_NUMBER;

const client = twilio(accountSid,authToken)

// app.post("/send-message",async(req,res)=>{
//     try{
//         const response = await client.messages.create({
//             body:"hi",
//             messagingServiceSid: MessagingServiceSid,
//             to: toPhoneNumber
//         })
//         res.status(200).json({success:true,message:"Messege sent succesfully"});
//     }catch(error){
//         res.status(500).json({success:false,error:error.message});
//     }
// })

app.post("/send-message", async (req, res) => {
    try {
        console.log("Successful");  // This will log when the POST request is made
        res.status(200).json({message:"message sent succesfully"});
    } catch (error) {
        res.status(500).json("Something went wrong in backend");
    }
});

app.listen(PORT,()=>{
    console.log('server is running');
})