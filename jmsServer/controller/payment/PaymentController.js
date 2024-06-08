const instance = require("../../server/Server");
const crypto = require('crypto');
const dotenv = require('dotenv').config();
const PaymentModel = require("../../models/SubscriptionModel");
const jwt = require("jsonwebtoken");
const conn = require("../../db/conn");

var cid = "";
var cname = "";
var sub_type = "";
var sub_amount = "";
var jwtToken = "";
const SECRET_KEY_HASH = dotenv.parsed.SECRET_KEY_HASH;
const checkout = async (req, res) => {
    try {
        // console.log(req.body);
        cid = req.body.cid;
        cname = req.body.cname;
        jwtToken = req.headers['authorization'];
        if (Number(req.body.amount) == 299) {
            sub_type = "Monthly";
            sub_amount = "299";
        } else if (Number(req.body.amount) == 599) {
            sub_type = "Quaterly";
            sub_amount = "599";
        } else {
            sub_type = "Yearly";
            sub_amount = "999";
        }
        const options = {
            amount: Number(req.body.amount * 100),  // amount in the smallest currency unit
            currency: "INR",
        };
        const order = await instance.orders.create(options);
        // console.log("Order", order);

        res.status(200).json({
            success: true,
            order
        });
    } catch (error) {
        console.error("Error in checkout:", error);

        // Handle the error and send an appropriate response to the client
        res.status(500).json({
            success: false,
            error: "An error occurred during checkout."
        });
    }
};
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Recommended: log the error, send it to a monitoring service, or handle it in some other way
});


//verfication controllere
const paymentVerification = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // console.log("Details"+cid);
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256', dotenv.parsed.RAZOR_PAY_KEY_SECRET)
        .update(body.toString())
        .digest('hex');
    // console.log("sig received", razorpay_signature);
    // console.log("sig generated", expectedSignature);

    const isauth = expectedSignature === razorpay_signature;
    if (isauth) {
        console.log("Payment Successfull");
        const result = await conn.query(
            'INSERT INTO subscriptions (client_name, client_id, sub_type, sub_amount, razorpay_order_id, razorpay_payment_id, razorpay_signature) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [cname, cid, sub_type, sub_amount, razorpay_order_id, razorpay_payment_id, razorpay_signature]
        );
        //database entry end
        //update client subscription
        console.log("decode " + jwtToken)
        jwtToken = jwtToken.replace('Bearer ', '');
        jwt.verify(jwtToken, SECRET_KEY_HASH, async function (err, decoded) {
            if (err) {
                console.error(err);
                return res.send({ status: "500", data: "Error Occured to Update" });
            } else {
                // console.log(decoded.username);
                // const result = await ClientSignup.findOne({ username: decoded.username });
                const result = await conn.query('SELECT * FROM client_jms WHERE username = $1', [decoded.username]);
                // console.log("result"+result)
                if (result.rows.length < 0) {
                    let current_date = new Date();
                    let end_date = new Date();

                    if (sub_type === "Monthly") {
                        end_date.setMonth(current_date.getMonth() + 1);
                    } else if (sub_type === "Quaterly") {
                        end_date.setMonth(current_date.getMonth() + 3);
                    } else {
                        end_date.setMonth(current_date.getMonth() + 12);
                    }

                    console.log("curr date", current_date);
                    console.log("end date", end_date);

                    try {
                        const updateQuery = `
                            UPDATE client_jms 
                            SET sub_start = $1, sub_end = $2, sub_sts = $3 
                            WHERE username = $4;
                        `;
                        const updateValues = [new Date(current_date), new Date(end_date), "true", decoded.username];

                        const updateResult = await conn.query(updateQuery, updateValues);
                        console.log("Update result:", updateResult);

                        if (updateResult.rowCount > 0) {
                            console.log("Client updated successfully");
                        } else {
                            console.log("No documents were modified");
                        }
                    } catch (error) {
                        console.error("Error updating document:", error);
                    }
                } else {
                    console.log("Document not found for username:", decoded.username);


                    //    const status= hashvalue.compare("dfbjhbfghbQGdwbdw", hash, function(err, data) {
                    //         // result == true
                    //         result._id==cid;
                    //     });

                    //     if(status){
                    //         console.log("verified");
                    //     }

                }
                res.redirect(`http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`); //frontend redirect
            }
        })


    } else {
        res.status(400).json({
            success: false,
        })
    }
}


module.exports = {
    checkout,
    paymentVerification
}