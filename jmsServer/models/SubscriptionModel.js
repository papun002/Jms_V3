const mongoose = require("mongoose");
const PaymentModel = mongoose.Schema({
    client_name:
    {
        type: String,
    },
    client_id:
    {
        type: String,
    },
    date:
    {
         type: Date, default: Date.now
    },
    sub_type:
    {
        type: String,
    },
    sub_amount:
    {
        type: String,
    },
    razorpay_order_id:
    {
        type: String,
    },
    razorpay_payment_id:
    {
        type: String,
    },
    razorpay_signature: {
        type: String,
    }
});

module.exports = mongoose.model("subscription", PaymentModel);