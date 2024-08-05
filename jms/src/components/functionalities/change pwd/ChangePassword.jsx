import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faEye, faEyeSlash);

function ChangePassword({ show, handleClose, staffdata }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      Swal.fire("Error", "New passwords do not match!", "error");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:4000/staffs/updatestaffprofilepwd",
        {
          oldPassword,
          newPassword,
          staffusername: staffdata.staffusername,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.status === "200") {
        Swal.fire("Success", "Password changed successfully!", "success").then(() => {
          let timeLeft = 10;
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'info',
            title: `You will be logged out in ${timeLeft} seconds`,
            showConfirmButton: false,
            timer: 10000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
              const timerInterval = setInterval(() => {
                timeLeft -= 1;
                Swal.getTitle().textContent = `You will be logged out in ${timeLeft} seconds`;
              }, 1000);

              setTimeout(() => {
                clearInterval(timerInterval);
                localStorage.removeItem("token");
                localStorage.removeItem("name")
                window.location.href = "/login";
              }, 10000);
            }
          });
        });

        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        Swal.fire("Error", "Old Password Doesn't Match", "error");
      }
    } catch (err) {
      Swal.fire("Error", err.response?.data?.data || "Error changing password!", "error");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="sm">
      <Modal.Header closeButton>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: "calc(100vh - 210px)", overflowY: "auto" }}>
        <div className="form-group position-relative">
          <input
            className="form-control"
            type={showOldPassword ? "text" : "password"}
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <FontAwesomeIcon
            icon={showOldPassword ? faEyeSlash : faEye}
            onClick={toggleOldPasswordVisibility}
            className="position-absolute"
            style={{ right: 10, top: 10, cursor: 'pointer' }}
          />
        </div>
        <div className="form-group position-relative">
          <input
            className="form-control"
            type={showNewPassword ? "text" : "password"}
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <FontAwesomeIcon
            icon={showNewPassword ? faEyeSlash : faEye}
            onClick={toggleNewPasswordVisibility}
            className="position-absolute"
            style={{ right: 10, top: 10, cursor: 'pointer' }}
          />
        </div>
        <div className="form-group position-relative">
          <input
            className="form-control"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <FontAwesomeIcon
            icon={showConfirmPassword ? faEyeSlash : faEye}
            onClick={toggleConfirmPasswordVisibility}
            className="position-absolute"
            style={{ right: 10, top: 10, cursor: 'pointer' }}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn btn-red" variant="primary" onClick={handleChangePassword}>
          Submit
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ChangePassword;
