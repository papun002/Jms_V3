import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "../../utils/Authrize";
function Login({ onLogin }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [mType, setmType] = useState("staff");
  const [isLogin, setIsLogin] = useState(false);
  const { user, setUser, login } = useAuth();
  const navi = useNavigate();

  useEffect(() => {
    if (localStorage.token) {
      axios
        .get("http://localhost:4000/clientloginauth/substs", {
          headers: {
            authorization: "Bearer " + localStorage.token,
          },
        })
        .then((res) => {
          console.log(res.data.subPeriod);
          if (res.data.subPeriod == true) {
            localStorage.getItem("mtype") === "client" ? navi("/") : navi("/staff/dashboard");
            
            //  window.location.reload();
          } else {
            navi("/sub");
            window.location.reload();
          }
        });
    }
  }, [isLogin]);

  //hashing
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .post("http://localhost:4000/clientloginauth/clientLoginAuth", {
          username: username,
          password: password,
          mType: mType,
        })
        .then((res) => {
          console.log(res.data.data);
          if (res.data.data.token) {
            localStorage.setItem("token", res.data.data.token);
            localStorage.setItem("name", res.data.data.name);
            localStorage.setItem("mtype", res.data.data.mtype);
            setIsLogin(true);
            setUser({ ...res.data.data });
            // login(username, password, mType);
            console.log("data", { ...res.data.data });
          } else {
            Swal.fire({
              title: "Error",
              text: "Invalid Username or Password!",
              icon: "error",
            });
          }
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div className="auth">
        <div className="auth_left">
          <div className="card">
            <div className="text-center mb-2">
              <a className="header-brand" href={undefined}>
                <i className="fa fa-soccer-ball-o brand-logo"></i>
              </a>
            </div>
            <div className="card-body">
              <div className="card-title">Login to your account</div>
              <form action="" method="POST" onSubmit={handleSubmit}>
                <div className="form-group">
                  <select
                    className="custom-select"
                    name="mtype"
                    onChange={(e) => setmType(e.target.value)}
                  >
                    <option value="staff">Staff</option>
                    <option value="client">Client</option>
                    <option value="admin">Administration</option>
                  </select>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter username"
                    name="uname"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    Password
                    <a
                      href="forgot-password.html"
                      className="float-right small"
                    >
                      I forgot password
                    </a>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-footer">
                  <button className="btn btn-primary btn-block" title="">
                    Sign in
                  </button>
                </div>
              </form>
            </div>
            <div className="text-center text-muted">
              Don't have account yet? <Link to="/signup">Sign up</Link>
            </div>
          </div>
        </div>
        <div className="auth_right full_img"></div>
      </div>
    </div>
  );
}

export default Login;
