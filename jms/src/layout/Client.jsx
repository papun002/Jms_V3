import { React, useState, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/header/Navbar";
import ClientSidebarEmbbed from "../components/functionalities/ClientLeftSidebarEmbbed";
import { PageTitleProvider } from "../components/functionalities/PageTitleProvider";
import axios from "axios";
import ClientNonSubSideBarData from "../components/functionalities/ClientNonSubSideBarData";
import verification from "../context/Context";
import { useAuth } from "../utils/Authrize";
import StaffSidebar from "../components/functionalities/Staff Functionalities/navbar/StaffNavbar";

function Client() {
  const redirect = useNavigate();
  const [log, setIsLog] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const handleLogout = (val) => {
    setIsLog(val);
  };
  const { user } = useAuth();

  useEffect(() => {
    if (!localStorage.token) {
      redirect("/login");
      // console.log("Not Effecting2...");
    }
  }, [log]);

  useEffect(() => {
    if (localStorage.token) {
      axios
        .get("http://localhost:4000/clientloginauth/substs", {
          headers: {
            authorization: "Bearer " + localStorage.token,
          },
        })
        .then((res) => {
          setSubscription(res.data.subPeriod);
          // console.log(res.data.subPeriod);
        });
    }
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "60vh" }}
        >
          <div className="loader"></div>
        </div>
      ) : localStorage.token ? (
        <PageTitleProvider>
          {subscription ? (
            localStorage.getItem("mtype") === "client" ? (
              <ClientSidebarEmbbed />
            ) : (
              <StaffSidebar />
            )
          ) : (
            <ClientNonSubSideBarData />
          )}
          <div id="main_content">
            <div className="page">
              <Navbar onLogout={handleLogout} />
              <div className="section-body">
                <div className="container-fluid">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </PageTitleProvider>
      ) : (
       <> <Outlet /></>
      )}
    </>
  );
}

export default Client;
