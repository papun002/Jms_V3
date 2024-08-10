import HeaderSearchTabPane from "../../components/header/HeaderSearchTabPane";
import { usePageTitle } from "../../components/functionalities/PageTitleProvider";
import React, { useMemo, useState, useEffect } from "react";
import EditableTable from "../../components/dataTable/EditableTable";
function Customer() {
  const { handlePageTitleChange } = usePageTitle();
  const [showFloatingNotification, setShowFloatingNotification] =
    useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [response, setResponse] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [itemType, setItemType] = useState("");

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

  const columns = React.useMemo(
    () => [
      {
        Header: "Barcode No.",
        accessor: "barcodeNo",
        className: "align-left",
        width: "110px",
      },
      {
        Header: "Item Name",
        accessor: "itemName",
        className: "align-left",
        width: "250px",
        cat:"View HUIDs"
      },
      {
        Header: "Type",
        accessor: "type",
        className: "align-left",
        width: "80px",
      },
      {
        Header: "Purity",
        accessor: "purity",
        className: "align-left",
        width: "80px",
      },
      {
        Header: "Pcs",
        accessor: "pcs",
        className: "align-center",
        width: "40px",
      },
      {
        Header: "Item Net Wt.",
        accessor: "itemNetWt",
        className: "align-right",
        width: "95px",
      },
      {
        Header: "Rate",
        accessor: "rate",
        className: "align-right",
        width: "80px",
      },
      {
        Header: "Item Value",
        accessor: "itemValue",
        className: "align-right",
        width: "120px",
      },
      {
        Header: "MC Rate",
        accessor: "mcRate",
        className: "align-right",
        width: "70px",
      },
      {
        Header: "Mk. Chgs.",
        accessor: "mkChgs",
        className: "align-right",
        width: "100px",
      },
      {
        Header: "Ot. Chgs.",
        accessor: "otChgs",
        className: "align-right",
        width: "70px",
      },
      {
        Header: "Taxable Value",
        accessor: "taxableValue",
        className: "align-right",
        width: "120px",
      },
      {
        Header: "Gross Value",
        accessor: "grossValue",
        className: "align-right",
        width: "131px",
      },
    ],
    []
  );
  const data = React.useMemo(
    () => [
      {
        barcodeNo: "LKJ123456",
        itemName: "Gold Ring",
        type: "GOLD",
        purity: "22K916",
        pcs: 1,
        itemNetWt: "10.00",
        rate: "8788",
        itemValue: "98282.00",
        mcRate: "899",
        mkChgs: "8980.22",
        otChgs: "0",
        taxableValue: "7898.88",
        grossValue: "887788.99",
      },
    ],
    []
  );
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
                  <h3 className="card-title">Tax Sale Invoice (B2C)</h3>
                  <h3 className="card-title ml-5 text-red font-weight-bold">
                    {" "}
                    Invoice No. : KJK/24-25/ 433{" "}
                  </h3>
                  <div className="ml-2">
                    <button className="btn btn-light btn-outline-info btn-sm">
                      <i className="fa fa-angle-left"></i>
                    </button>
                  </div>
                  <div className="ml-1">
                    <button className="btn btn-light btn-outline-info btn-sm">
                      <i className="fa fa-angle-right"></i>
                    </button>
                  </div>
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
                      <div className="col-lg-3 col-md-6 col-sm-12">
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
                      <div className="col-lg-3 col-md-6 col-sm-12">
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
                      <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label htmlFor="">Mob No.</label>
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
                          <EditableTable columns={columns} data={data} />
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="row">
                          <div className="col-lg-4 col-md-6 col-sm-12 right-border">
                            <div className="pd-green p-1">
                              Exchange & Sale Return Details
                            </div>
                            <div className="mt-2">
                              <div className="form-group row">
                                <label
                                  htmlFor=""
                                  className="col-sm-4 col-form-label"
                                >
                                  Exchg. Amt:{" "}
                                </label>
                                <div className="col-sm-6">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Exchng Amt."
                                    name="exchange"
                                  />
                                </div>
                                <div className="col-sm-2">
                                  <button className="btn btn-red btn-sm">
                                    <i className="fa fa-search"></i>
                                  </button>
                                </div>
                                <div className="mt-2 col-sm-12">

                                <div className="tablex-responsive">
                                  <table className="tablex v_center ">
                                    <thead>
                                      <tr>
                                        <th>Metal Type</th>
                                        <th>Gr.Wt.</th>
                                        <th>WS%</th>
                                        <th>Net Wt.</th>
                                        <th>Rate</th>
                                        <th>Ex. Amt</th>
                                      </tr>
                                    </thead>
                                    <tbody >
                                      <tr>
                                        <td>
                                          {" "}
                                          <small><b>Old Gold</b></small>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td><small><b>Old Gold 916</b></small></td>
                                      </tr>
                                      <tr>
                                        <td><small><b>Silver</b></small></td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6 col-sm-12">
                            <div className="p-1 pd-green">Payment Details</div>
                            <form action="" className="mt-2">
                              <div className="form-group row">
                                <label
                                  htmlFor=""
                                  className="col-sm-4 col-form-label"
                                >
                                  Advance Paid:
                                </label>
                                <div className="col-sm-6">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name=""
                                    id=""
                                  />
                                </div>
                                <div className="col-sm-2">
                                  <button className="btn btn-red btn-sm">
                                    <i className="fa fa-search"></i>
                                  </button>
                                </div>
                              </div>
                              <div className="form-group row">
                                <label
                                  htmlFor=""
                                  className="col-sm-4 col-form-label"
                                >
                                  Payable Amt:
                                </label>
                                <div className="col-sm-7">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Payment Amt."
                                    name="paymentamt"
                                  />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label
                                  htmlFor=""
                                  className="col-sm-4 col-form-label"
                                >
                                  Cash Paid:
                                </label>
                                <div className="col-sm-7">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Payment Amt."
                                    name="paymentamt"
                                  />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label
                                  htmlFor=""
                                  className="col-sm-4 col-form-label"
                                >
                                  Card:
                                </label>
                                <div className="col-sm-7">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Payment Amt."
                                    name="paymentamt"
                                  />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label
                                  htmlFor=""
                                  className="col-sm-4 col-form-label"
                                >
                                  Online/UPI
                                </label>
                                <div className="col-sm-3">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Payment Amt."
                                    name="paymentamt"
                                  />
                                </div>
                                <div className="col-sm-4">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name=""
                                    id=""
                                  />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label
                                  htmlFor=""
                                  className="col-sm-4 col-form-label"
                                >
                                  Due Amt:
                                </label>
                                <div className="col-sm-7">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Payment Amt."
                                    name="paymentamt"
                                  />
                                </div>
                              </div>
                            </form>
                          </div>
                          <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="mt-4">
                              <div className="form-group row">
                                <label
                                  htmlFor=""
                                  className="col-sm-6 col-form-label"
                                >
                                  Total GST Amt.
                                </label>
                                <div className="col-sm-6">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Total GST Amt"
                                    name="exchange"
                                  />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label
                                  htmlFor=""
                                  className="col-sm-5 col-form-label"
                                >
                                  HUID Chgs:
                                </label>
                                <div className="col-sm-7">
                                  <div className="input-group">
                                    <input
                                      type="text"
                                      className="form-control row col-sm-3"
                                      id="inlineFormInputGroup"
                                      placeholder="Pcs"
                                    />
                                    <div className="input-group-prepend">
                                      <div className="input-group-text">@</div>
                                    </div>
                                    <input
                                      type="text"
                                      className="form-control row"
                                      id="inlineFormInputGroup"
                                      placeholder="Price"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="form-group row">
                                <label
                                  htmlFor=""
                                  className="col-sm-5  col-form-label "
                                >
                                  <b>Gross Total:</b>
                                </label>
                                <div className="col-sm-7">
                                  <input
                                    type="text"
                                    className="form-control font-weight-bold"
                                    placeholder="Enter Exchng Amt."
                                    name="exchange"
                                  />
                                </div>
                              </div>
                              <div className="form-group row">
                                <div className="mt-3">
                                  <div class="custom-control custom-checkbox mr-sm-2">
                                    <input
                                      type="checkbox"
                                      class="custom-control-input"
                                      id="customControlAutosizing"
                                    />
                                    <label
                                      class="custom-control-label"
                                      for="customControlAutosizing"
                                    >
                                      Save in Local Drive
                                    </label>
                                  </div>
                                  <div class="custom-control custom-checkbox mr-sm-2">
                                    <input
                                      type="checkbox"
                                      class="custom-control-input"
                                      id="customControlAutosizing"
                                    />
                                    <label
                                      class="custom-control-label"
                                      for="customControlAutosizing"
                                    >
                                      Show Print View
                                    </label>
                                  </div>
                                  <div class="custom-control custom-checkbox mr-sm-2">
                                    <input
                                      type="checkbox"
                                      class="custom-control-input"
                                      id="customControlAutosizing"
                                    />
                                    <label
                                      class="custom-control-label"
                                      for="customControlAutosizing"
                                    >
                                      Manual MC
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-1 col-md-6 col-sm-12">
                            <div className="mt-2">
                              <button className="btn btn-red w-100">NEW</button>
                            </div>
                            <div className="mt-2">
                              <button className="btn btn-red w-100">
                                OPEN
                              </button>
                            </div>
                            <div className="mt-2">
                              <button className="btn btn-yellow w-100">
                                SAVE
                              </button>
                            </div>
                            <div className="mt-2">
                              <button className="btn btn-red w-100">
                                PRINT
                              </button>
                            </div>
                            <div className="mt-2">
                              <button className="btn btn-danger w-100">
                                CLEAR
                              </button>
                            </div>
                            <div className="mt-2">
                              <button className="btn btn-success w-100">
                                HOLD
                              </button>
                            </div>
                          </div>
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
