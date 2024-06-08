import { useEffect, useState } from "react";
import React from "react";
import { usePageTitle } from "../../components/functionalities/PageTitleProvider";
import InputFields from "../../components/inputFields/InputFields";
import axios from "axios";
import Toast from "../../components/alert/Toast";
import ModalComponent from "../../components/modal/ModalComponent";

function AddProductCategory() {
  const [modalCat, setModalCat] = useState(null);
  const { handlePageTitleChange } = usePageTitle();
  const [toastVisible, setToastVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [catData, setCatData] = useState([]);
  const [response, setResponse] = useState(null);
  const token = localStorage.getItem("token");
  //page naming
  useEffect(() => {
    handlePageTitleChange("Category Section");
    return () => {
      handlePageTitleChange("Empty");
    };
  }, [handlePageTitleChange]);
  //page naming end

  //inserting Category
  const handleCategory = (e) => {
    e.preventDefault();
    const cate = e.target.pdtcat.value;
    const pdtype = e.target.pdttype.value;

    // console.log(data);
    axios
      .post(
        "http://localhost:4000/client/cat/categoryinsert",
        {
          category: cate,
          pdttype: pdtype,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then((res) => {
        // console.log(res.data.data);

        if (res.data.status === "201") {
          setToastVisible(true);
          setResponse({
            message: res.data.data,
            type: "success",
          });
          fetchingCategory();
        } else if (res.data.status === "400") {
          setToastVisible(true);
          setResponse({
            message: res.data.data,
            type: "warning",
          });
        } else {
          setToastVisible(true);
          setResponse({
            message: res.data.data,
            type: "error",
          });
        }
        // setCatData((prevCatData) => [...prevCatData, res.data.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //getting category
  const fetchingCategory = async () => {
    await axios
      .get("http://localhost:4000/client/cat/getcategory", {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        // console.log(res.data.data);

        setCatData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchingCategory();
  }, []);

  //deleting category
  const handleCatDelete = async (id) => {
    // console.log(id);
    await axios
      .delete(`http://localhost:4000/client/category/deletecategory/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.status === "200") {
          setToastVisible(true);
          setResponse({
            message: res.data.data,
            type: "success",
          });
          fetchingCategory();
        } else {
          setToastVisible(true);
          setResponse({
            message: res.data.data,
            type: "error",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // toastVisible
  const handleCloseToast = () => {
    setToastVisible(false);
  };
  // toastVisible end

  return (
    <div className="mt-3">
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12">
          {toastVisible && (
            <Toast
              message={response.message}
              type={response.type}
              duration={1000}
              onClose={handleCloseToast}
            />
          )}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Add Product Category</h3>
              <div className="card-options ">
                <a
                  href="#"
                  className="card-options-collapse"
                  data-toggle="card-collapse"
                >
                  <i className="fa fa-chevron-up"></i>
                </a>
              </div>
            </div>
            <form className="card-body" onSubmit={handleCategory}>
              <div className="col-md-12 col-lg-12 col-sm-12">
                <div className="row">
                  <div className="col-md-6 col-lg-6">
                    <div className="form-group">
                      <label>
                        Item Type <span className="text-danger">*</span>
                      </label>
                      <select name="pdttype" id="" className="form-control">
                        <option value="gold">Gold</option>
                        <option value="silver">Silver</option>
                        <option value="diamond">Diamond</option>
                        <option value="others">Others</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-6">
                    <div className="form-group">
                      <label>
                        Category Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="pdtcat"
                      />
                    </div>
                  </div>
                </div>
                <div className="row clearfix">
                  <div className="col-sm-12 col-lg-12">
                    <button type="submit" className="btn btn-red w-100">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {loading ? (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "60vh" }}
        >
          <div className="loader"></div>
        </div>
      ) : (
        <div className="row">
          <div className="col-sm-12">
            <div className="tab-pane" id="Notifications">
              <div className="card-deck">
                {catData.map((cat, index) => (
                  <div className="col-sm-4" key={index}>
                    <div className="card">
                      <div className="card-header">
                        <h3 className="card-title text-capitalize">
                          Category List | {cat.pdt_type}
                          <small>
                            Total no of Categories:{" "}
                            {
                              catData.filter((c) => c.pdt_type === cat.pdt_type)
                                .length
                            }
                          </small>
                          <small className="text-capitalize">
                            Item Type:{" "}
                            <span className="text-red">{cat.pdt_type}</span>
                          </small>
                        </h3>
                      </div>
                      <div className="card-body">
                        <ul className="list-group">
                          {catData
                            .filter((c) => c.pdt_type === cat.pdt_type)
                            .map((filteredCat, idx) => (
                              <li className="list-group-item" key={idx}>
                                <span className="text-muted">{idx + 1}. </span>
                                <span className="text-dark">
                                  {filteredCat.cat_name}
                                </span>
                                <div className="float-right">
                                  <div className="item-action dropdown ml-2">
                                    <a href={undefined} data-toggle="dropdown">
                                      <i className="fa fa-ellipsis-v"></i>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right">
                                      <a
                                        href={undefined}
                                        className="dropdown-item"
                                      >
                                        <i className="dropdown-icon fa fa-edit"></i>{" "}
                                        Update
                                      </a>
                                      <a
                                        href={undefined}
                                        className="dropdown-item"
                                        onClick={() =>
                                          handleCatDelete(filteredCat._id)
                                        }
                                      >
                                        <i className="dropdown-icon fa fa-times"></i>{" "}
                                        Delete
                                      </a>
                                    </div>
                                    {/* <button
                            className="btn btn-red mr-2"
                            data-toggle="tooltip modal"
                            data-placement="top"
                            title="Edit"
                            data-target="#staticBackdrop"
                            onClick={() => openModal(filteredCat._id)}
                          >
                            <i className="fa fa-edit"></i>
                          </button>
                          <button
                            className="btn btn-red mr-2"
                            onClick={() => handleCatDelete(filteredCat._id)}
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Delete"
                          >
                            <i className="fa fa-trash"></i>
                          </button> */}
                                  </div>
                                </div>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {modalCat && (
        // <ModalComponent user={modalCat} onClose={closeModal} />
        <ModalComponent
          data={catData}
          onClose={closeModal}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          modalTitle="Category Details"
          editableFields={editableFields}
        />
      )}
    </div>
  );
}

export default AddProductCategory;
