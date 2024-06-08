import { Navigate, Outlet, json, useLocation } from "react-router-dom";
import { useAuth } from "./Authrize";
import { useEffect } from "react";
const AuthVerify = ({ children, usertype }) => {
  const { user, setUser } = useAuth();
  const location = useLocation();

  window.onload = function () {
    return <Loading />;
  };

  if (!localStorage.getItem("name")) {
    return (
      <>
        <Loading />
      </>
    );
  }

  console.log("User type", usertype, user);
  return usertype == localStorage.getItem("mtype") ?(
    children
  ):(<>
  <h1>Unauthorized access</h1>
  </>)
};

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
export default AuthVerify;
