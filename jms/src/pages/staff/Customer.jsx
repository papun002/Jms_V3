import HeaderSearchTabPane from "../../components/header/HeaderSearchTabPane";
import { usePageTitle } from "../../components/functionalities/PageTitleProvider";
import { useEffect, React, useState } from "react";
import axios from "axios";
function Customer() {
  const { handlePageTitleChange } = usePageTitle();
  const [showFloatingNotification, setShowFloatingNotification] =
    useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [itemType, setItemType] = useState("");
  const [notification, setNotification] = useState("");

  useEffect(() => {
    handlePageTitleChange("Staffs Management");
    return () => {
      handlePageTitleChange("Empty");
    };
  }, [handlePageTitleChange]);

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(today.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    setCurrentDate(formattedDate);
  }, []);

  //   dynamic TextField
  const [inputRows, setInputRows] = useState([
    { id: 1, values: ["", "", "", "", "", "", ""] },
  ]);

  const handleAddRow = () => {
    const newRow = {
      id: inputRows.length + 1,
      values: ["", "", "", "", "", "", ""],
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

    if (index === 0) {
      // Assuming the barcode is the first field
      fetchItemData(value, id);
    }
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

  // toastVisible
  const handleCloseToast = () => {
    setToastVisible(false);
  };
  // toastVisible end

  const handleSelectChange = (event) => {
    setItemType(event.target.value);
  };

  //fetching through barcode
  const fetchItemData = async (barcode, rowId) => {
    try {
      const response = await axios.get(`/staffs/pdt/getproduct/${barcode}`,{
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });

      const itemData = response.data;
      const updatedRows = inputRows.map((row) =>
        row.id === rowId
          ? {
              ...row,
              values: [
                itemData.barcode || "",
                itemData.item_name || "",
                itemData.huid || "",
                itemData.item_weight || "",
                itemData.item_category || "",
                itemData.item_description || "",
                itemData.item_price || "",
              ],
            }
          : row
      );
      setInputRows(updatedRows);
      setNotification(""); // Clear any previous notification
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setNotification("No data found");
      } else {
        setNotification("Error fetching item data");
      }
      console.error("Error fetching item data:", error);
    }
  };
  //end of fetching through barcode
  return (
    <div>
      <HeaderSearchTabPane
        firstData={"Add Customer"}
        secondData={"View Customer"}
      />
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
                  <h3 className="card-title">Add Customer Details</h3>
                  <div className="card-options">
                    {showFloatingNotification && (
                      <div className="notify text-red">
                        <i className="fa fa-exclamation-triangle"></i>{" "}
                        <small className="">Please Fillup all Fields</small>
                      </div>
                    )}
                  </div>
                </div>
                <form className={`${!isFormValid ? " disabled-form" : ""}`}>
                  <div className="card-body">
                    <div className="row clearfix">
                      <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label htmlFor="">Purchase Date</label>
                          <input
                            type="date"
                            className="form-control"
                            name="pdate"
                            value={currentDate}
                            onChange={(e) => setCurrentDate(e.target.value)} // Optional: Update state if the date changes
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label htmlFor="">Ornaments Type</label>
                          <select
                            name="itemtype"
                            id=""
                            className="form-control"
                            onChange={handleSelectChange}
                          >
                            <option value="">Select Type</option>
                            <option value="Gold">Gold</option>
                            <option value="Silver">Silver</option>
                            {/* <option value="Diamonds">Diamonds</option> */}
                          </select>
                        </div>
                      </div>
                      {(itemType === "Gold" || itemType === "Silver") && (
                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="form-group">
                            <>
                              <label htmlFor="">
                                {itemType === "Gold"
                                  ? "Today Gold Price"
                                  : itemType === "Silver"
                                  ? "Today Silver Price"
                                  : null}
                              </label>
                              <input
                                type="text"
                                name="specifiedItemType"
                                className="form-control"
                                placeholder="Price Per Gm.."
                              />
                            </>
                          </div>
                        </div>
                      )}
                      <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label htmlFor="">Customer Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Customer Name"
                            name="customername"
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-12">
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
                      <div className="col-lg-4 col-md-6 col-sm-12">
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
                                  <td>Item Barcode</td>
                                  <td>Item Name</td>
                                  <td>HUID</td>
                                  <td>Item Wt. </td>
                                  <td>Item Category</td>
                                  <td>Item Desc.</td>
                                  <td>Item Price</td>
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
                                        <input
                                          type="text"
                                          className="form-control"
                                          value={value || ""}
                                          onChange={(e) =>
                                            handleInputChange(
                                              row.id,
                                              index,
                                              e.target.value
                                            )
                                          }
                                        />
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
                          <label htmlFor="">Total Wt.</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Total Weight"
                            name="totalamount"
                          />
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label htmlFor="">Total Price</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Total Amount"
                            name="totalamount"
                          />
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label htmlFor="">GST 3%</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter GST Amount"
                            name="totalamount"
                          />
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label htmlFor="">Grand Total</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Grand Total"
                            name="totalamount"
                          />
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="form-group">
                          <input
                            type="submit"
                            value="Submit"
                            className="btn btn-red w-100"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customer;
