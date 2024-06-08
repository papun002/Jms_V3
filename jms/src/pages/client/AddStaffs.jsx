import HeaderSearchTabPane from "../../components/header/HeaderSearchTabPane";
import { usePageTitle } from "../../components/functionalities/PageTitleProvider";
import { useEffect, React, useState } from "react";
import BigCards from "../../components/cards/BigCards";
import InputFields from "../../components/inputFields/InputFields";
import ClientInsertHandler from "../../components/functionalities/clientDatabaseServerHandler/ClientInsertHandler";
import Swal from "sweetalert2";
import axios from "axios";

function AddStaffs() {
  const { handlePageTitleChange } = usePageTitle();
  const [imgDataUrl, setImageDataUrl] = useState("");
  const [userData, setUserData] = useState([]);
  const [staffProfiles, setStaffProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handlePageTitleChange("Staffs Management");
    return () => {
      handlePageTitleChange("Empty");
    };
  }, [handlePageTitleChange]);

  const handleImageChange = (e) => {
    e.preventDefault();
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      const imgDataUrl = reader.result;
      //  console.log(imgDataUrl);
      setImageDataUrl(imgDataUrl);
    };
    reader.onerror = (error) => {
      console.log("error: ", error);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submiting....");
    const formData = new FormData(staffInsert);

    const checkData = [...formData.values()];

    if (checkData.filter((data) => data === "").length) {
      Swal.fire({
        title: "Please fill all the fields",
        icon: "error",
        showClass: {
          popup: `
            animate__animated
            animate__rotateInDownLeft
            animate__faster
          `,
          hide: `animate__animated
          animate__rotateOutDownRight
          animate__faster
          `,
        },
      });
    } else {
      formData.set("img", imgDataUrl);

      //json format
      const jsonStaffData = {};
      formData.forEach((value, key) => {
        jsonStaffData[key] = value;
      });
      setUserData(jsonStaffData);
    }
  };

  //Fetching Staff Profiles from Server
  useEffect(() => {
    axios
      .get("http://localhost:4000/client/staffs/staffprofile", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res) {
          // console.log(res.data.data);
          setStaffProfiles(res.data.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error in Fetching Staffs:", error);
      });
  }, []);

  return (
    <div>
      <HeaderSearchTabPane firstData={"Add Staff"} secondData={"View Staff"} />
      <div className="tab-content">
        <div className="tab-pane fade show active" id="addnew" role="tabpanel">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Add Staffs</h3>
                </div>
                <form
                  className="card-body"
                  method="POST"
                  id="staffInsert"
                  onSubmit={handleSubmit}
                >
                  <div className="row clearfix">
                    <InputFields
                      type={"text"}
                      placeholder={"Enter Staff Name"}
                      name={"name"}
                      label={"Enter Staff Name"}
                    />
                    <InputFields
                      type={"number"}
                      placeholder={"Enter Staff Contact"}
                      name={"contact"}
                      label={"Enter Staff Contact"}
                    />
                    <InputFields
                      type={"text"}
                      placeholder={"Enter Staff Email"}
                      name={"email"}
                      label={"Enter Staff Email"}
                    />
                    <InputFields
                      isSelect={true}
                      options={[
                        { value: "male", option: "Male" },
                        { value: "female", option: "female" },
                      ]}
                      placeholder="Select Gender"
                      name="gender"
                      label="Select Gender"
                    />
                    <InputFields
                      type={"date"}
                      placeholder={"Date of Joining"}
                      name={"doj"}
                      label={"Date of Joining"}
                    />
                    <InputFields
                      type={"text"}
                      placeholder={"Enter Address"}
                      name={"address"}
                      label={"Enter Address"}
                    />
                    <InputFields
                      type={"text"}
                      placeholder={"Enter Government Proof"}
                      name={"govtproof"}
                      label={"Enter Government Proof"}
                    />
                    <InputFields
                      type={"text"}
                      placeholder={"Enter Staff Id"}
                      name={"staffusername"}
                      label={"Enter Staff Username"}
                    />
                    <InputFields
                      type={"text"}
                      placeholder={"Enter Password"}
                      name={"staffpwd"}
                      label={"Enter Staff Password"}
                    />
                    <div className="form-group col-lg-12 col-md-6">
                      <label>Staff Profile</label>
                      <input
                        type="file"
                        className="form-control"
                        name="img"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </div>
                    <div className="col-sm-12 ">
                      <button
                        type="submit"
                        name="submit"
                        className="btn btn-red w-100"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="tab-pane fade" id="list" role="tabpanel">
          {loading ? (
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ minHeight: "60vh" }}
            >
              <div className="loader"></div>
            </div>
          ) : (
            <div className="row clearfix">
              {staffProfiles.map((staffProfile, index) => {
                return (
                  <BigCards
                    Key={index}
                    id={staffProfile._id}
                    img={staffProfile.staffimg}
                    name={staffProfile.name}
                    email={staffProfile.email}
                    contact={staffProfile.contact}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
      {Object.keys(userData).length !== 0 ? (
        <ClientInsertHandler cStaffInsert={userData} />
      ) : null}
    </div>
  );
}

export default AddStaffs;
