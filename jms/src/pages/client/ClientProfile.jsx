import React, { useEffect, useState } from "react";
import axios from "axios";
import { usePageTitle } from "../../components/functionalities/PageTitleProvider";
import { useLocation } from "react-router-dom";

function ClientProfile() {
  const [editable, setEditable] = useState(false);
  const [clientInfo, setClientInfo] = useState([]);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const { handlePageTitleChange } = usePageTitle();

  useEffect(() => {
    axios.get("http://localhost:4000/client/clientprofile", {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      // console.log("Client Profile:", res.data.data);
      setClientInfo([res.data.data]);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching client profile:", error);
      setLoading(false);
    });
  }, []);
  
  

  // console.log("client info",clientInfo); 

  useEffect(() => {
    handlePageTitleChange("Client Profile");
    return () => {
      handlePageTitleChange("Empty");
    };
  }, [handlePageTitleChange]);

  // Update data
  const handleUpdate = () => {
    console.log("Updating data:", formData);

    // axios
    //   .put(`/client/staffs/updatestaff/${formData._id}`, formData)
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
   console.log("Updated", formData);
    if (!editable) {
      // Reset formData to current values from clientInfo when entering edit mode
      setFormData({ ...clientInfo[0] });
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

  // Delete data
  const handleDelete = () => {
    // Logic to handle deleting the staff info
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
          {clientInfo ? clientInfo.map((client, index) => (
            <div className="col-lg-12 col-md-12" key={index}>
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title"><span className="text-red">{client.name}</span> Profile</h3>
                  <div className="card-options">
                    <div className="item-action dropdown ml-2">
                      <a href={undefined} data-toggle="dropdown">
                        <i className="fa fa-ellipsis-v"></i>
                      </a>
                      <div className="dropdown-menu dropdown-menu-right">
                        {editable ? (
                          <>
                            <a
                              href={undefined}
                              className="dropdown-item"
                              onClick={handleUpdate}
                            >
                              <i className="dropdown-icon fa fa-edit"></i> Save
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
                              onClick={handleDelete}
                            >
                              <i className="dropdown-icon fa fa-lock"></i>{" "}
                              Change Password
                            </a>
                            <a
                              href={undefined}
                              className="dropdown-item"
                              onClick={handleDelete}
                            >
                              <i className="dropdown-icon fa fa-trash"></i>{" "}
                              Delete
                            </a>

                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body ribbon">
                <div class="ribbon-box green">New</div>
                  <div className="row">
                    <div className="col-lg-3 col-md-12 text-center">
                      <div className="square">
                        <img
                          className="rounded-square"
                          src={client.staffimg ? client.staffimg : '/assets/images/user.png'}
                          width={300}
                          alt=""
                        />
                      </div>
                      <div className="sts dflex">
                        {client.sts === "active" ? (
                          <span className="">
                            Status:{" "}
                            <i
                              className="fa fa-circle"
                              style={{ color: "#008000" }}
                            ></i>
                          </span>
                        ) : (
                          <span className="d">
                            Status :{" "}
                            <i
                              className="fa fa-circle"
                              style={{ color: "#FF0000" }}
                            ></i>
                          </span>
                        )}
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
                            <p className="mb-0 text-capitalize">{client.name}</p>
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
                            <p className="mb-0">{client.contact}</p>
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
                            <p className="mb-0">{client.email}</p>
                          )}
                        </li>
                        <li className="list-group-item">
                          <small className="text-muted">Address: </small>
                          {editable ? (
                            <input
                              type="text"
                              name="gender"
                              className="form-control"
                              value={formData.gender}
                              onChange={handleChange}
                            />
                          ) : (
                            <p className="mb-0 text-capitalize">
                              {client.address}
                            </p>
                          )}
                        </li>
                      </ul>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <ul className="list-group">
                        <li className="list-group-item">
                          <small className="text-muted">Store Name: </small>
                          {editable ? (
                            <input
                              type="text"
                              name="address"
                              className="form-control"
                              value={formData.address}
                              onChange={handleChange}
                            />
                          ) : (
                            <p className="mb-0 text-capitalize">
                              {client.store_name}
                            </p>
                          )}
                        </li>
                        <li className="list-group-item">
                          <small className="text-muted">
                            Tag Mark:{" "}
                          </small>
                          {editable ? (
                            <input
                              type="text"
                              name="govtproof"
                              className="form-control"
                              value={formData.govtproof}
                              onChange={handleChange}
                            />
                          ) : (
                            <p className="mb-0 text-uppercase">{client.tag_mark}</p>
                          )}
                        </li>
                        <li className="list-group-item">
                          <small className="text-muted">Username: </small>
                          {editable ? (
                            <input
                              type="text"
                              name="staffid"
                              className="form-control"
                              value={formData.staffid}
                              onChange={handleChange}
                            />
                          ) : (
                            <p className="mb-0">{client.username}</p>
                          )}
                        </li>
                        <li className="list-group-item">
                          <small className="text-muted">Subscription Start: </small>
                          {editable ? (
                            <input
                              type="text"
                              name="staffpwd"
                              className="form-control"
                              value={editable ? formData.staffpwd : ""}
                              onChange={handleChange}
                            />
                          ) : (
                            <p className="mb-0"><Date>{client.sub_start}</Date> </p>
                          )}
                        </li>
                        <li className="list-group-item">
                          <small className="text-muted">Subscription End:</small>
                          {editable ? (
                            <input
                              type="file"
                              name="staffimg"
                              className="form-control"
                              onChange={handleChange}
                            />
                          ) : (
                            <p className="mb-0"><Date>{client.sub_end}</Date></p>
                            // <p className="mb-0">{new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(client.sub_end)}</p>
                          )}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )):(
            <div className="card">
              <div className="card-body">
                <h4 className="text-center">No data found</h4>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ClientProfile;
