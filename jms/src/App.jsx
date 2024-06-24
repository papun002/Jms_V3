import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/client/Home";
import AddStaffs from "./pages/client/AddStaffs";
import AddProductCategory from "./pages/client/AddProductCategory";
import AddProducts from "./pages/client/AddProducts";
import GenerateBarcodes from "./pages/client/GenerateBarcodes";
import ViewReports from "./pages/client/ViewReports";
import Login from "./pages/login/Login";
import ClientSub from "./pages/client/ClientSub";
import SuccessPayment from "./components/subscription/SuccessPayment";
import ErrorPage from "./pages/404/ErrorPage";
import axios from "axios";
import ModalComponent from "./components/modal/ModalComponent";
import Orders from "./pages/client/Orders";
import verification from "./context/Context";
import Authrize from "./utils/Authrize";
import AuthVerify from "./utils/AuthVerify";
import ClientProfile from "./pages/client/ClientProfile";
import StaffHome from "./pages/staff/StaffHome";
import Profiles from "./pages/client/StaffProfiles";
import Client from "./layout/Client";
import Customer from "./pages/staff/Customer";
import Stocks from "./pages/staff/Stocks";
import OrdersStaff from "./pages/staff/Orders";
function App() {
  const [verify, setVerify] = useState(null);

  useEffect(() => {
    if (localStorage.token) {
      axios
        .get("http://localhost:4000/clientloginauth/substs", {
          headers: {
            authorization: "Bearer " + localStorage.token,
          },
        })
        .then((res) => {
          setVerify((prev) => (prev = res.data.subPeriod));
          // console.log("SubPeriod",res.data.subPeriod);
        });
    } else {
      setVerify((prev) => (prev = false));
    }
  }, []);

  useEffect(() => {
    console.log("Verify", verify);
  }, [verify]);

  return (
    <>
      <Authrize>
        {/* <AuthVerify> */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route
                index
                element={
                  <AuthVerify usertype="client">
                    <Home />
                  </AuthVerify>
                }
              />

              <Route path="/staffs" element={<AddStaffs />} />
              <Route
                path="/products/category"
                element={<AddProductCategory />}
              />
              <Route path="/products/products" element={<AddProducts />} />
              <Route path="/orders/products" element={<Orders />} />
              <Route
                path="/barcodes/generate-barcodes"
                element={<GenerateBarcodes />}
              />
              <Route path="/reports" element={<ViewReports />} />
              <Route path="/profile" element={<Profiles />} />
              <Route path="/profile/:id" element={<Profiles />} />
              <Route path="/clients/profile" element={<ClientProfile />} />

              <Route
                path="/products/category/:id"
                element={<ModalComponent />}
              />

              <Route
                path="/sub"
                element={
                  <AuthVerify>
                    <ClientSub />
                  </AuthVerify>
                }
              />
              <Route
                path="/paymentsuccess"
                element={
                  <AuthVerify>
                    <SuccessPayment />
                  </AuthVerify>
                }
              />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<ErrorPage />} />

            {/* staff Module Routes */}
            <Route path="/staff/" element={<Client />}>
              <Route
                path="/staff/dashboard"
                element={
                  <AuthVerify usertype="staff">
                    <StaffHome />
                  </AuthVerify>
                }
              />
              <Route
                path="/staff/customer"
                element={
                  <AuthVerify usertype="staff">
                    <Customer />
                  </AuthVerify>
                }
              />
              <Route
                path="/staff/stocks"
                element={
                  <AuthVerify usertype="staff">
                    <Stocks />
                  </AuthVerify>
                }
              />
              <Route
                path="/staff/orders"
                element={
                  <AuthVerify usertype="staff">
                    <OrdersStaff />
                  </AuthVerify>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
        {/* </AuthVerify> */}
      </Authrize>
    </>
  );
}

function Loading() {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "60vh" }}
    >
      <div className="loader"></div>
    </div>
  );
}

function UnauthorizedRoutes() {
  return (
    // <Route path="/login" element={<Login />} />
    <Navigate to="/home" />
  );
}

export default App;
