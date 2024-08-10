import React, { useEffect, useState } from "react";
import { usePageTitle } from "../../components/functionalities/PageTitleProvider";
import HeaderSearchTabPane from "../../components/header/HeaderSearchTabPane";
import axios from "axios";
import Toast from "../../components/alert/Toast";
import ProductTable from "../../components/dataTable/client/ProductTable";
import ProductInsertionTable from "../../components/dataTable/client/ProductInsertionTable";

const AddProducts = () => {
  const { handlePageTitleChange } = usePageTitle();
  const [category, setCategory] = useState([]);
  const [selectedProductType, setSelectedProductType] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [toastVisible, setToastVisible] = useState(false);
  const [response, setResponse] = useState(null);
  const [isFormValid, setIsFormValid] = useState(true);
  const [showFloatingNotification, setShowFloatingNotification] =
    useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [voucherNo, setVoucherNo] = useState(1);
  const [uniqueNumber, setUniqueNumber] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    handlePageTitleChange("Stocks Section");
    return () => handlePageTitleChange("Empty");
  }, [handlePageTitleChange]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/client/cat/retrivecategory",
          {
            headers: { Authorization: `${localStorage.getItem("token")}` },
          }
        );
        setCategory(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  const fetchUniqueNumber = async () => {
    try {
      let uniqueNumber;
      let isUnique = false;
  
      while (!isUnique) {
        const response = await axios.get(
          "http://localhost:4000/client/barcode/generate",
          {
            headers: { Authorization: `${localStorage.getItem("token")}` },
          }
        );
        uniqueNumber = response.data.uniqueNumber;
  
        // Check if the generated barcode number already exists in the tableData
        isUnique = !tableData.some((row) => row.barcode === uniqueNumber);
      }
  
      setUniqueNumber(uniqueNumber);
      setError("");
    } catch (error) {
      console.error("Error generating unique number:", error);
      setError("Failed to generate unique number. Please try again.");
    }
  };
  useEffect(() => {
    fetchUniqueNumber();
  }, []);

  const regenerateBarcode = (e) => {
    fetchUniqueNumber();
  };

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    setCurrentDate(formattedDate);
  }, []);

  useEffect(() => {
    const filteredCats = category.filter(
      (cat) => cat.pdt_type === selectedProductType
    );
    setFilteredCategories(filteredCats);
    setSuggestions(filteredCats.map((cat) => cat.cat_name));
  }, [selectedProductType, category]);

  const [formData, setFormData] = useState({
    barcode: uniqueNumber,
    itype: "",
    iname: "",
    weight: "",
    pcs: "",
    huid: "",
    size: "",
    hsn: "7113",
    mkCharges: "",
    otherCharges: "",
    description: "",
  });

  const [tableData, setTableData] = useState(
    Array(8).fill({
      barcode: uniqueNumber,
      itype: "",
      iname: "",
      weight: "",
      pcs: "",
      huid: "",
      size: "",
      mkCharges: "",
      otherCharges: "",
      description: "",
    })
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    if (name === "iname") {
      const filteredSuggestions = filteredCategories
        .filter((cat) =>
          cat.cat_name.toLowerCase().includes(value.toLowerCase())
        )
        .map((cat) => cat.cat_name);
      setSuggestions(filteredSuggestions);
    }
  };

  const handleAddItem = () => {
    setTableData((prevTableData) => {
      const updatedTableData = [...prevTableData];
      const emptyRowIndex = updatedTableData.findIndex(
        (row) => !row.iname && !row.weight && !row.pcs
      );
  
      if (emptyRowIndex !== -1) {
        // Replace the empty row with new data
        updatedTableData[emptyRowIndex] = { ...formData, barcode: uniqueNumber };
      } else {
        // Add a new row if all existing rows are filled
        updatedTableData.push({ ...formData, barcode: uniqueNumber });
      }
  
      return updatedTableData;
    });
  
    setFormData({
      barcode: uniqueNumber,
      itype: selectedProductType,
      iname: "",
      weight: "",
      pcs: "",
      huid: "",
      size: "",
      hsn: "7113",
      mkCharges: "",
      otherCharges: "",
      description: "",
    });
  };
  const handleProductTypeChange = (e) => {
    setSelectedProductType(e.target.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      itype: e.target.value,
    }));
  };

  const handleCloseToast = () => setToastVisible(false);

  const handleSuggestionClick = (suggestion) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      iname: suggestion,
    }));
    setSuggestions([]);
  };

  const handleVoucherIncrement = () => {
    setVoucherNo((prevVoucherNo) => prevVoucherNo + 1);
  };

  const handleVoucherDecrement = () => {
    setVoucherNo((prevVoucherNo) =>
      prevVoucherNo > 1 ? prevVoucherNo - 1 : 1
    );
  };

  const logTableData = (e) => {
    e.preventDefault();
    console.log(tableData);
  };
  return (
    <div>
      <HeaderSearchTabPane firstData="Add Product" secondData="View Product" />

      {toastVisible && (
        <Toast
          message={response?.message}
          type={response?.type}
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
                  <h3 className="card-title ml-5 font-weight-bold">
                    Voucher No.:{" "}
                    <span className="ml-1 p-1 text-red">{voucherNo}</span>
                  </h3>
                  <div className="ml-2">
                    <button
                      className="btn btn-light btn-outline-info btn-sm"
                      onClick={handleVoucherDecrement}
                    >
                      <i className="fa fa-angle-left"></i>
                    </button>
                  </div>
                  <div className="ml-1">
                    <button
                      className="btn btn-light btn-outline-info btn-sm"
                      onClick={handleVoucherIncrement}
                    >
                      <i className="fa fa-angle-right"></i>
                    </button>
                  </div>
                  {showFloatingNotification && (
                    <div className="card-options notify text-red">
                      <i className="fa fa-exclamation-triangle"></i>
                      <small>Please Fillup all Fields</small>
                    </div>
                  )}
                </div>

                <form className={`${!isFormValid ? " disabled-form" : ""}`}>
                  <div className="card-body">
                    <div className="row clearfix">
                      <div className="col-lg-2 col-md-4 col-sm-12">
                        <div className="form-group">
                          <label>Date</label>
                          <input
                            type="date"
                            className="form-control"
                            name="date"
                            value={currentDate}
                            onChange={(e) => setCurrentDate(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-4 col-sm-12">
                        <div className="form-group">
                          <label>Item Type</label>
                          <select
                            className="form-control"
                            name="itype"
                            id="productType"
                            onChange={handleProductTypeChange}
                            value={selectedProductType}
                          >
                            <option value="">Select Item Type</option>
                            <option value="22K916">22K916 Gold</option>
                            <option value="22K">Gold 22K</option>
                            <option value="silver 92.5">Silver 92.5</option>
                            <option value="silver">Silver</option>
                            <option value="diamond">Diamond</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-4 col-sm-12">
                        <div
                          className={`form-group${
                            !isFormValid ? " disabled-form" : ""
                          }`}
                        >
                          <label>Select Item Name</label>
                          <div className="autocomplete">
                            <input
                              type="text"
                              className="form-control"
                              name="iname"
                              id="itemName"
                              value={formData.iname}
                              onChange={handleInputChange}
                              placeholder="Item Name"
                            />
                            {suggestions.length > 0 && (
                              <ul className="suggestions-list text-capitalize">
                                {suggestions.map((suggestion, index) => (
                                  <li
                                    key={index}
                                    onClick={() =>
                                      handleSuggestionClick(suggestion)
                                    }
                                  >
                                    {suggestion}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-1 col-md-4 col-sm-12">
                        <div className="form-group">
                          <label>HSN No.</label>
                          <input
                            type="text"
                            className="form-control"
                            name="hsn"
                            value="7113"
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-4 col-sm-12">
                        <div className="form-group">
                          <label>Mk. Chrgs.</label>
                          <input
                            type="text"
                            className="form-control"
                            name="mkCharges"
                            value={formData.mkCharges}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-4 col-sm-12">
                        <div className="form-group">
                          <label>Other Chrgs.</label>
                          <input
                            type="text"
                            className="form-control"
                            name="otherCharges"
                            value={formData.otherCharges}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-2 col-md-4 col-sm-12">
                        <div className="form-group">
                          <label>
                            Barcode No.{" "}
                            <small>
                              <a onClick={regenerateBarcode}>Regenerate</a>
                            </small>
                          </label>
                          <input
                            type="text"
                            className="form-control text-uppercase font-weight-bold"
                            name="barcode"
                            value={uniqueNumber}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-4 col-sm-12">
                        <div className="form-group">
                          <label>HUID</label>
                          <input
                            type="text"
                            className="form-control"
                            name="huid"
                            value={formData.huid}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-1 col-md-4 col-sm-12">
                        <div className="form-group">
                          <label>Pcs.</label>
                          <input
                            type="text"
                            className="form-control"
                            name="pcs"
                            value={formData.pcs}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-4 col-sm-12">
                        <div className="form-group">
                          <label>Weight (gm)</label>
                          <input
                            type="text"
                            className="form-control"
                            name="weight"
                            value={formData.weight}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-2 col-sm-12">
                        <div className="form-group">
                          <label>Size</label>
                          <input
                            type="text"
                            className="form-control"
                            name="size"
                            value={formData.size}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-4 col-sm-12">
                        <div className="form-group">
                          <label>Item Desc.</label>
                          <input
                            type="text"
                            className="form-control"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-1 col-md-2 col-sm-12">
                        <div className="form-group mt-4">
                          <button
                            type="button"
                            className="btn btn-success mt-2 mr-1"
                            onClick={handleAddItem}
                          >
                            <i className="fa fa-plus"></i>
                          </button>
                          <button type="button" className="btn btn-red mt-2">
                            <i className="fa fa-clear">AC</i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 col-lg-12">
                        <ProductInsertionTable data={tableData} />
                      </div>
                    </div>
                    <button
                      type="submit"
                      onClick={logTableData}
                      className="btn btn-red mt-2 w-100"
                    >
                      Save
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
};

export default AddProducts;
