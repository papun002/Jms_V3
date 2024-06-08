import { useEffect, useState } from "react";
import React from "react";
import HeaderSearchTabPane from "../../components/header/HeaderSearchTabPane";
import { usePageTitle } from "../../components/functionalities/PageTitleProvider";
import axios from "axios";
import Toast from "../../components/alert/Toast";
import OrderTable from "../../components/dataTable/client/OrderTable";

function Orders() {
  const { handlePageTitleChange } = usePageTitle();
  const [showFloatingNotification, setShowFloatingNotification] =
    useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [imageDataUrl, setImageDataUrl] = useState("");
  const [advanceType, setAdvanceType] = useState("");
  const [showOrnamentsField, setShowOrnamentsField] = useState(false);
  const token = localStorage.getItem("token");

  //page title start
  useEffect(() => {
    handlePageTitleChange("Orders Section");
    return () => {
      handlePageTitleChange("Empty");
    };
  }, [handlePageTitleChange]);
  //page title end

  //   dynamic TextField
  const [inputRows, setInputRows] = useState([
    { id: 1, values: ["", "", "", "", "", ""] },
  ]);

  const handleAddRow = () => {
    const newRow = {
      id: inputRows.length + 1,
      values: ["", "", "", "", "", ""],
    };
    setInputRows([...inputRows, newRow]);
  };

  const handleRemoveRow = (id) => {
    const updatedRows = inputRows.filter((row) => row.id !== id);
    setInputRows(updatedRows);
  };

  const handleInputChange = (id, index, value) => {
    const updatedRows = inputRows.map((row) =>
      row.id === id
        ? {
            ...row,
            values: [
              ...row.values.slice(0, index),
              value,
              ...row.values.slice(index + 1),
            ],
          }
        : row
    );
    setInputRows(updatedRows);
  };
  //end of dynamic

  //form validation
  useEffect(() => {
    const isFormValid = inputRows.every((row) =>
      row.values.every((value, index) => {
        // Skip file input validation
        if (index === 5) {
          return true; // File input is always considered valid
        }
        // Check string values for other inputs
        return typeof value === "string" && value.trim().length > 0;
      })
    );
    setIsFormValid(isFormValid);
  }, [inputRows]);
  //end of form validation

  //floating notification
  useEffect(() => {
    setShowFloatingNotification(!isFormValid); // Show floating notification when form is not valid
  }, [isFormValid]);
  //floating notification end

  // Function to handle change in advance type
  const handleAdvanceTypeChange = (e) => {
    const selectedType = e.target.value;
    setAdvanceType(selectedType);

    // Show ornaments field if selected type is "Ornaments"
    if (selectedType === "Ornaments") {
      setShowOrnamentsField(true);
    } else {
      setShowOrnamentsField(false);
    }
  };
  //end of advance type change

  // toastVisible
  const handleCloseToast = () => {
    setToastVisible(false);
  };
  // toastVisible end

  //insert form data
  const insertOrder = async (e) => {
    console.log("inserting order....");
    e.preventDefault();
    try {
      // Show loader while inserting data
      showLoader();

      // Collect form data
      const formData = {
        orderDate: document.querySelector('input[name="orderDate"]').value,
        customerName: document.querySelector('input[name="customerName"]')
          .value,
        contact: document.querySelector('input[name="contact"]').value,
        address: document.querySelector('input[name="address"]').value,
        advanceType: document.getElementById("advanceType").value,
        cashAmount:
          advanceType === "Cash" || advanceType === "both"
            ? document.querySelector('input[name="cashamt"]').value
            : "",
        ornamentsType:
          advanceType === "Ornaments" || advanceType === "both"
            ? document.getElementById("otype").value
            : "",
        ornamentsWeight:
          advanceType === "Ornaments" || advanceType === "both"
            ? document.querySelector('input[name="ornamentWeight"]').value
            : "",
      };

      // Collect product details asynchronously using FileReader
      const productDetails = [];

      // Function to read file input and collect product details
      const readProductDetails = (row) => {
        return new Promise(async (resolve, reject) => {
          // Mark the function as async
          try {
            const productImage = await readProductImage(row.values[5]); // await inside an async function
            const rowData = {
              productName: row.values[0],
              productWeight: row.values[1],
              productCategory: row.values[2],
              productType: row.values[3],
              productDesc: row.values[4],
              productImage: productImage,
            };
            productDetails.push(rowData);
            resolve();
          } catch (error) {
            reject(new Error("Error reading file: " + error));
          }
        });
      };

      const readProductImage = async (fileInput) => {
        if (!(fileInput instanceof Blob)) {
          // Return default image URL if no file is selected
          return "assets/images/noImg.jpg";
        }
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) =>
            reject(new Error("Error reading file: " + error));
          reader.readAsDataURL(fileInput);
        });
      };

      // Collect product details for each input row asynchronously
      await Promise.all(inputRows.map((row) => readProductDetails(row)));

      // Combine formData and productDetails into a single object to send to the backend
      const requestData = { formData, productDetails };
      console.log(requestData);

      // Send request to the server
      const res = await axios.post(
        "http://localhost:4000/client/order/addorder",
        requestData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      console.log(res.data);
      if (res.data.status === "201") {
        setToastVisible(true);
        setResponse({
          message: res.data.data,
          type: "success",
        });
      } else {
        setToastVisible(true);
        setResponse({
          message: res.data.data,
          type: "error",
        });
      }

      // Hide loader after request completes
      hideLoader();
    } catch (error) {
      console.log("Error inserting order: ", error);
    }
  };

  function showLoader() {
    // Show loader element
    // const loader = document.querySelector('.loader');
    // loader.style.display = 'block';
  }

  function hideLoader() {
    // Hide loader element
  }

  return (
    <div>
      <HeaderSearchTabPane firstData={"Add Order"} secondData={"View Orders"} />
      {toastVisible && (
        <Toast
          message={response.message}
          type={response.type}
          duration={1000}
          onClose={handleCloseToast}
        />
      )}

      <div className="tab-content">
        <div className="tab-pane fade show active" id="addnew" role="tabpanel">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Order Details</h3>
                  <div className="card-options">
                    {showFloatingNotification && (
                      <div className="notify text-red">
                        <i className="fa fa-exclamation-triangle"></i>{" "}
                        <small className="">Please Fillup all Fields</small>
                      </div>
                    )}
                  </div>
                </div>
                <form
                  onSubmit={insertOrder}
                  className={`${!isFormValid ? " disabled-form" : ""}`}
                >
                  <div className="card-body">
                    <div className="row clearfix">
                      <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label htmlFor="">Order Date</label>
                          <input
                            type="date"
                            className="form-control"
                            name="orderDate"
                          />
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label htmlFor="">Customer Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Customer Name"
                            name="customerName"
                          />
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label htmlFor="">Contact</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Customer Contact"
                            name="contact"
                          />
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label htmlFor="">Address</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Customer Address"
                            name="address"
                          />
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-12 col-sm-12">
                        <div className="form-group">
                          <div className="table-responsive">
                            <table className="table" id="addProduct">
                              <thead>
                                <tr className="text-capitalize">
                                  <td>Item Name</td>
                                  <td>
                                    Item Wt.{" "}
                                    <small className="text-lowercase text-red">
                                      estimate wt.{" "}
                                    </small>{" "}
                                  </td>
                                  <td>Item Category</td>
                                  <td>
                                    Item Type{" "}
                                    <small className="text-lowercase text-red">
                                      Metal type{" "}
                                    </small>
                                  </td>
                                  <td>Item Desc.</td>
                                  <td>Item Image</td>
                                  <th>
                                    <button
                                      type="button"
                                      className="btn btn-success btn-sm btnAddRow"
                                      onClick={handleAddRow}
                                    >
                                      <i className="fa fa-plus"></i>
                                    </button>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {inputRows.map((row, rowIndex) => (
                                  <tr key={rowIndex}>
                                    {row.values.map((value, index) => (
                                      <td key={index}>
                                        {/* Render file input for the Product Image column */}
                                        {index === 5 ? (
                                          <input
                                            type="file"
                                            className="form-control-file"
                                            onChange={(e) =>
                                              handleInputChange(
                                                row.id,
                                                index,
                                                e.target.files[0]
                                              )
                                            }
                                          />
                                        ) : (
                                          <input
                                            type="text"
                                            className={`form-control`}
                                            value={value}
                                            onChange={(e) =>
                                              handleInputChange(
                                                row.id,
                                                index,
                                                e.target.value
                                              )
                                            }
                                          />
                                        )}
                                      </td>
                                    ))}
                                    <td>
                                      <button
                                        type="button"
                                        className="btn tag-success btn-sm"
                                        onClick={() => handleRemoveRow(row.id)}
                                      >
                                        <i className="fa fa-minus"></i>
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label htmlFor="">Advance Type</label>
                          <select
                            id="advanceType"
                            className="form-control"
                            value={advanceType}
                            onChange={handleAdvanceTypeChange}
                            name="advanceType"
                          >
                            <option value="">Select Advance Type</option>
                            <option value="Cash">Cash</option>
                            <option value="Ornaments">Ornaments</option>
                            <option value="both">Both Cash & Ornaments</option>
                          </select>
                        </div>
                      </div>
                      {(advanceType === "Cash" || advanceType === "both") && (
                        <div className="col-lg-3 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label htmlFor="cashAmount">Cash Amount</label>
                            <input
                              type="text"
                              id="cashAmount"
                              className="form-control"
                              name="cashamt"
                              placeholder="Cash Amount"
                            />
                          </div>
                        </div>
                      )}

                      {(advanceType === "Ornaments" ||
                        advanceType === "both") && (
                        <>
                          <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="form-group">
                              <label>Ornaments Type</label>
                              <select
                                name="otype"
                                id="otype"
                                className="form-control"
                              >
                                <option value="">Select Ornaments Type</option>
                                <option value="gold">Gold</option>
                                <option value="silver">Silver</option>
                                <option value="diamond">Diamond</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="form-group">
                              <label>Ornaments Wt.</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Ornament Weight"
                                name="ornamentWeight"
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={!isFormValid}
                      className="btn btn-red mt-2 w-100"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="tab-pane fade" id="list" role="tabpanel">
          <div className="col-12">
            <div className="row">
             <OrderTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
