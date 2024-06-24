import React, { useEffect, useState } from "react";
import { usePageTitle } from "../../components/functionalities/PageTitleProvider";
import HeaderSearchTabPane from "../../components/header/HeaderSearchTabPane";
import axios from "axios";
import Toast from "../../components/alert/Toast";
import ProductTable from "../../components/dataTable/client/ProductTable";

function AddProducts() {
  const { handlePageTitleChange } = usePageTitle();
  const [category, setCategory] = useState([]);
  const [selectedProductType, setSelectedProductType] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [toastVisible, setToastVisible] = useState(false);
  const [response, setResponse] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showFloatingNotification, setShowFloatingNotification] =
    useState(false);
  const token = localStorage.getItem("token");

  //floating notification
  useEffect(() => {
    setShowFloatingNotification(!isFormValid); // Show floating notification when form is not valid
  }, [isFormValid]);

  //floating notification end

  //   dynamic TextField
  const [inputRows, setInputRows] = useState([
    { id: 1, values: ["", "", "", "", ""] },
  ]);

  const handleAddRow = () => {
    const newRow = {
      id: inputRows.length + 1,
      values: ["", "", "", "", ""],
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

  //page title start
  useEffect(() => {
    handlePageTitleChange("Stocks Section");
    return () => {
      handlePageTitleChange("Empty");
    };
  }, [handlePageTitleChange]);
  //page title end

  // feting category data from server
  const fetchingCategory = async () => {
    await axios
      .get("http://localhost:4000/client/cat/getcategory", {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setCategory(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchingCategory();
  }, []);
  
  const handleProductTypeChange = (e) => {
    const selectedType = e.target.value;
    setSelectedProductType(selectedType);
    // Filter categories based on the selected product type
    const filteredCats = category.filter(
      (cat) => cat.pdt_type === selectedType
    );
    setFilteredCategories(filteredCats);
  };
  //end of fetching category data from server

  //Inserting data to the Server | Database
  const InsertProduct = async (e) => {
    e.preventDefault();
    // console.log("Input data:", typeof(inputRows));
    try {
      const dataToProduct = inputRows.map((row) => ({
        barcode: row.values[0],
        name: row.values[1],
        huid: row.values[2],
        weight: row.values[3],
        description: row.values[4],
        cname: e.target.cat.value,
        ptype: e.target.ptype.value,
      }));
      // console.log(typeof dataToProduct);
      // console.log("Data to product:", dataToProduct);

      const res = await axios.post(
        "http://localhost:4000/client/pdt/addproduct",
        dataToProduct,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      // console.log(res.data);
      if (res.data.status === "201") {
        setToastVisible(true);
        setResponse({
          message: res.data.data,
          type: "success",
        });
        fetchProduct();
      } else {
        setToastVisible(true);
        setResponse({
          message: res.data.data,
          type: "error",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  // toastVisible
  const handleCloseToast = () => {
    setToastVisible(false);
  };
  // toastVisible end

  //form validation
  useEffect(() => {
    const isFormValid = inputRows.every((row) =>
      row.values.every((value) => value.trim().length > 0)
    );
    setIsFormValid(isFormValid);
  }, [inputRows]);
  //end of form validation
  return (
    <div>
      <HeaderSearchTabPane
        firstData={"Add Product"}
        secondData={"View Product"}
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
                  <h3 className="card-title">Add Items</h3>
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
                  onSubmit={InsertProduct}
                  className={`${!isFormValid ? " disabled-form" : ""}`}
                >
                  <div className="card-body">
                    <div className="row clearfix">
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label htmlFor="">Item Type</label>
                          <select
                            className="form-control"
                            name="ptype"
                            id="productType"
                            onChange={handleProductTypeChange}
                            value={selectedProductType}
                          >
                            <option value="">Select Item Type</option>
                            <option value="gold">Gold</option>
                            <option value="silver">Silver</option>
                            <option value="diamond">Diamond</option>
                            <option value="others">Others</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div
                          className={`form-group${
                            !isFormValid ? " disabled-form" : ""
                          }`}
                        >
                          <label htmlFor="category">Select Category</label>
                          <select
                            className="form-control"
                            name="cat"
                            id="category"
                          >
                            {filteredCategories.length > 0 ? (
                              <>
                                <option value="">Select Category</option>
                                {filteredCategories.map((cat) => (
                                  <option key={cat._id} value={cat.cat_name}>
                                    {cat.cat_name}
                                  </option>
                                ))}
                              </>
                            ) : (
                              <option value="" disabled>
                                No categories found
                              </option>
                            )}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 col-lg-12">
                        <div className="form-group">
                          <div className="table-responsive">
                            <table className="table" id="addProduct">
                              <thead>
                                <tr>
                                  <th>Barcode</th>
                                  <th>Name</th>
                                  <th>HUID No.</th>
                                  <th>Weight</th>
                                  <th>Description</th>
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
                                          className={`form-control `}
                                          value={value}
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
              <ProductTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProducts;
