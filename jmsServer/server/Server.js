const Razorpay = require("razorpay");
const dotenv = require('dotenv').config();


const instance = new Razorpay({
    key_id: dotenv.parsed.RAZOR_PAY_KEY_API,
    key_secret: dotenv.parsed.RAZOR_PAY_KEY_SECRET,
  }); 


module.exports = instance;