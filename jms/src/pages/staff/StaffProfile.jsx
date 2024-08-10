import React, { useEffect, useState } from "react";
import axios from "axios";
import { usePageTitle } from "../../components/functionalities/PageTitleProvider";
import { useLocation } from "react-router-dom";
import ChangePassword from "../../components/functionalities/change pwd/ChangePassword";

function StaffProfile() {
  const [editable, setEditable] = useState(false);
  const [staffInfo, setstaffInfo] = useState([]);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const { handlePageTitleChange } = usePageTitle();
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageDataUrl, setImageDataUrl] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/staffs/profile", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // console.log("staff Profile:", res.data.data);
        setstaffInfo([res.data.data]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching staff profile:", error);
        setLoading(false);
      });
  }, []);

  // console.log("staff info",staffInfo);

  useEffect(() => {
    handlePageTitleChange("Staff Profile");
    return () => {
      handlePageTitleChange("Empty");
    };
  }, [handlePageTitleChange]);

  // Update data
  const handleUpdate = () => {
    console.log("Updating data:", formData);

    // axios
    //   .put(`/staff/staffs/updatestaff/${formData._id}`, formData)
    //   .then((response) => {
    //     if (response.status === 200) {
    //       setEditable(false);
    //       // Update originalData if needed
    //       setOriginalData(formData);
    //     } else {
    //       console.error("Error updating staff data");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error updating staff data:", error);
    //   });
  };
  // Toggle edit mode
  const handleEditToggle = () => {
    // console.log("Updated", formData);
    if (!editable) {
      // Reset formData to current values from staffInfo when entering edit mode
      setFormData({ ...staffInfo[0] });
    }
    setEditable(!editable);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //change password
  const handleChangePassword = () => {
    setShowModal(true);
  };
  // end of change password

  //modal
  const handleCloseModal = () => {
    setShowModal(false);
  };
  //end of modal

  //change image
  const handleChangeImage = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.style.display = "none";
  
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      const staffusername = "username"; // Replace with your method of getting staffusername
      handleFileUpload(file, staffusername);
    };
  
    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
  };
  

  return (
    <>
      {loading ? (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "60vh" }}
        >
          <div className="loader"></div>
        </div>
      ) : (
        <div className="row clearfix mt-3">
          {staffInfo ? (
            staffInfo.map((staff, index) => (
              <div className="col-lg-12 col-md-12" key={index}>
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">
                      <span className="text-red">{staff.name}</span> Profile
                    </h3>
                    <div className="card-options">
                      <div className="item-action dropdown ml-2">
                        <button className="btn" data-toggle="dropdown">
                          <i className="fa fa-ellipsis-v"></i>
                        </button>
                        <div className="dropdown-menu dropdown-menu-right">
                          {editable ? (
                            <>
                              <a
                                href={undefined}
                                className="dropdown-item"
                                onClick={handleUpdate}
                              >
                                <i className="dropdown-icon fa fa-edit"></i>{" "}
                                Save
                              </a>
                              <a
                                href={undefined}
                                className="dropdown-item"
                                onClick={handleEditToggle}
                              >
                                <i className="dropdown-icon fa fa-times"></i>{" "}
                                Cancel
                              </a>
                            </>
                          ) : (
                            <>
                              <a
                                href={undefined}
                                className="dropdown-item"
                                onClick={handleEditToggle}
                              >
                                <i className="dropdown-icon fa fa-edit"></i>{" "}
                                Update
                              </a>
                              <a
                                href={undefined}
                                className="dropdown-item"
                                onClick={handleChangePassword}
                              >
                                <i className="dropdown-icon fa fa-lock"></i>{" "}
                                Change Password
                              </a>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body ribbon">
                    <div className="row">
                      <div
                        className="ribbon-box green"
                        style={{ zIndex: "9999" }}
                      >
                        {" "}
                        {staff.sts === "active" ? (
                          <span className="">Active</span>
                        ) : (
                          <span className="d">Deactivate</span>
                        )}
                      </div>
                      <div className="col-lg-3 col-md-12 text-center">
                        <div className="square">
                          <img
                            className="rounded-square"
                            src={
                              staff.staffimg
                                ? staff.staffimg
                                : "/assets/images/user.png"
                            }
                            width={300}
                            alt=""
                          />
                        </div>
                        <div className="mt-1 mb-1">
                          <button
                            className="btn btn-success btn-lg w-100"
                            onClick={handleChangeImage}
                          >
                            Change Profile Image
                          </button>
                        </div>
                      </div>
                      <div className="col-lg-5 col-md-6">
                        <ul className="list-group">
                          <li className="list-group-item">
                            <small className="text-muted">Name: </small>
                            {editable ? (
                              <input
                                type="text"
                                name="name"
                                value={formData.name}
                                className="form-control"
                                onChange={handleChange}
                              />
                            ) : (
                              <p className="mb-0 text-capitalize">
                                {staff.name}
                              </p>
                            )}
                          </li>
                          <li className="list-group-item">
                            <small className="text-muted">Contact: </small>
                            {editable ? (
                              <input
                                type="text"
                                name="contact"
                                className="form-control"
                                value={formData.contact}
                                onChange={handleChange}
                              />
                            ) : (
                              <p className="mb-0">{staff.contact}</p>
                            )}
                          </li>
                          <li className="list-group-item">
                            <small className="text-muted">Email: </small>
                            {editable ? (
                              <input
                                type="text"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                              />
                            ) : (
                              <p className="mb-0">{staff.email}</p>
                            )}
                          </li>
                          <li className="list-group-item">
                            <small className="text-muted">Address: </small>
                            {editable ? (
                              <input
                                type="text"
                                name="gender"
                                className="form-control"
                                value={formData.address}
                                onChange={handleChange}
                              />
                            ) : (
                              <p className="mb-0 text-capitalize">
                                {staff.address}
                              </p>
                            )}
                          </li>
                        </ul>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <ul className="list-group">
                          <li className="list-group-item">
                            <small className="text-muted">Gender</small>
                            {editable ? (
                              <input
                                type="text"
                                name="address"
                                className="form-control"
                                value={formData.gender}
                                onChange={handleChange}
                              />
                            ) : (
                              <p className="mb-0 text-capitalize">
                                {staff.gender}
                              </p>
                            )}
                          </li>
                          <li className="list-group-item">
                            <small className="text-muted">
                              Date of Joining:{" "}
                            </small>
                            {editable ? (
                              <input
                                type="text"
                                name="address"
                                className="form-control"
                                value={formData.doj}
                                onChange={handleChange}
                              />
                            ) : (
                              <p className="mb-0 text-capitalize">
                                {staff.doj}
                              </p>
                            )}
                          </li>
                          <li className="list-group-item">
                            <small className="text-muted">Government ID:</small>
                            {editable ? (
                              <input
                                type="text"
                                name="govtproof"
                                className="form-control"
                                value={formData.govtproof}
                                onChange={handleChange}
                              />
                            ) : (
                              <p className="mb-0 text-uppercase">
                                {staff.govtproof}
                              </p>
                            )}
                          </li>
                          <li className="list-group-item">
                            <small className="text-muted">Username: </small>
                            {editable ? (
                              <input
                                type="text"
                                name="staffid"
                                className="form-control"
                                value={formData.staffusername}
                                onChange={handleChange}
                              />
                            ) : (
                              <p className="mb-0">{staff.staffusername}</p>
                            )}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="card">
              <div className="card-body">
                <h4 className="text-center">No data found</h4>
              </div>
            </div>
          )}
        </div>
      )}
      {staffInfo && (
        <ChangePassword
          show={showModal}
          handleClose={handleCloseModal}
          staffdata={staffInfo[0]}
        />
      )}
    </>
  );
}

export default StaffProfile;
