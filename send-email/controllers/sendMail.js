
const nodemailer = require("nodemailer");
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

const sendMail=async(req,res)=>{
    const otp = generateOTP();
    let testAccount =  nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'mariane.keeling@ethereal.email',
            pass: 'D9HVdwjn8eANPyu5CR'
        }
    });
 
let info = await transporter.sendMail({
    from: '"nodemailer 👻" <cydney.weissnat@ethereal.email>', // sender address
    to: "shivanitrivedi18051996@gmail.com", // list of receivers
    subject: `Hello Shivani your otp is ${otp}`, 
     text: `Your OTP code is ${otp}. Please use this code to verify your email.`,
    html: `<b>Hello Shivani ${otp}</b>`, // html body
  });
  console.log("Message send ", info.messageId);
res.json(info)
}



module.exports=sendMail;