import React, { useEffect } from "react";
import { usePageTitle } from "../../components/functionalities/PageTitleProvider";
import Subscription from "../../components/subscription/Subscription";
import axios from "axios";
import { useContext } from "react";
import  verification  from "../../context/Context";
import { Navigate } from "react-router-dom";
function ClientSub() {
  const { handlePageTitleChange } = usePageTitle();
  const cid = localStorage.getItem("uid");
  const { verify, setVerify } = useContext(verification);
  useEffect(() => {
    handlePageTitleChange("Subscription Management");
    return () => {
      handlePageTitleChange("Empty");
    };
  }, [handlePageTitleChange]);
console.log("SUBV",verify)
  const checkoutHandler = async (amount) => {
    const cname = localStorage.getItem("name");
    // fetching api key
    const {
      data: { key },
    } = await axios.get("http://localhost:4000/api/getkey");

    // console.log(key); // api key fetched

    const {
      data: { order },
    } = await axios.post("http://localhost:4000/payment/checkout", {
      amount,
      cid,
      cname,
    },{
      headers:{
        authorization: `Bearer ${localStorage.getItem("token")}`
      },
    });

    console.log(order);
    const options = {
      key, // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Rohit's Corp",
      description: "Test Transaction",
      image: "../assets/images/user.png",
      order_id: order.id,
      callback_url: "http://localhost:4000/payment/paymentverification",
      prefill: {
        name: cname,
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    if (order && order.methods && order.methods.upi) {
        console.log("UPI is supported");
    } else {
        console.log("UPI is not supported");
    }
    const razor = new Razorpay(options);
    razor.open();
    // console.log(data);
  };
  return (
    <> { !verify ?( <div>
      <div className="row clearfix">
        <div className="col-12">
          <div className="card c_grid c_yellow">
            <div className="card-body text-white" style={{ background: "#E74C3C" }}>
              <div className="section-title">
                <h2>Subscription Expire !!</h2>
                <p>Your Plan is expired, Choose a new plan.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row clearfix">
        <Subscription
          subType={"Monthly"}
          price={"299"}
          handleSubBtn={checkoutHandler}
        />
        <Subscription
          subType={"Half-Yearly"}
          price={"599"}
          handleSubBtn={checkoutHandler}
        />
        <Subscription
          subType={"Yearly"}
          price={"999"}
          handleSubBtn={checkoutHandler}
        />
      </div>
    </div>):(
      <Navigate to="/" />
      )}</>
  );
}

export default ClientSub;
