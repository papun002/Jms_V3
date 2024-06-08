import React, { useState, useRef, useEffect } from "react";
import JsBarcode from "jsbarcode";
import "../../../public/assets/css/barcode.css";
import { usePageTitle } from "../../components/functionalities/PageTitleProvider";

function GenerateBarcodes() {
  const [barcodeFormat, setBarcodeFormat] = useState("CODE128");
  const [numBarcodes, setNumBarcodes] = useState("");
  const svgRefs = useRef([]);

  const handleFormatChange = (e) => {
    setBarcodeFormat(e.target.value);
  };

  const handleNumBarcodesChange = (e) => {
    const num = parseInt(e.target.value, 10);
    setNumBarcodes(num);
  };

  const generateUniqueValue = () => {
    // Generate a 6-digit unique number
    const uniqueNumber = Math.floor(100000 + Math.random() * 900000);
    return `LKJ${uniqueNumber}`;
  };

  const printBarcode = (printId) => {

    if(svgRefs.current.length > 0 ){
        svgRefs.current = [];
        console.log(svgRefs.current.length)
    }
    if (numBarcodes == "") {
      Swal.fire({
        title: "Error",
        text: "Please Enter Number of barcode to show !",
        icon: "error",
      });
    } else if (numBarcodes == 0) {
      Swal.fire({
        title: "Error",
        text: "Number Must be greaterthan 1 !",
        icon: "error",
      });
    } else {
      const printContents = document.getElementById(printId).innerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
return false;

    }
    return false;
  };

  useEffect(() => {
    // Generate barcodes with unique values
    Array.from({ length: numBarcodes }, (_, i) => {
      const uniqueValue = generateUniqueValue();
      if (svgRefs.current[i]) {
        JsBarcode(svgRefs.current[i], uniqueValue, {
          format: barcodeFormat,
          width: 2, // Adjust the width for a minimal size
          height: 30, // Adjust the height for a minimal size
        });
      }
    });
  }, [barcodeFormat, numBarcodes]);

  const { handlePageTitleChange } = usePageTitle();

  useEffect(() => {
    handlePageTitleChange("Barcode Section");
    return () => {
      handlePageTitleChange("Empty");
    };
  }, [handlePageTitleChange]);

  return (
    <>
      <div className="row mt-3">
        <div className="col-sm-12 col-lg-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Barcode Section</h3>
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
            <div className="card-body">
              <div className="row">
                <div className="col-md-12 col-lg-12 col-sm-12">
                  <div className="row clearfix">
                    <div className="col-md-4" style={{ display: "none" }}>
                      <label>Barcode Format:</label>
                      <select
                        className="form-control"
                        value={barcodeFormat}
                        onChange={handleFormatChange}
                      >
                        <option value="CODE128">CODE128</option>
                        {/* Add more barcode formats as needed */}
                      </select>
                    </div>
                    <div className="col-md-12 col-lg-9">
                      <label>Number of Barcodes:</label>
                      <input
                        type="number"
                        className="form-control"
                        value={numBarcodes}
                        onChange={handleNumBarcodesChange}
                        required
                      />
                    </div>
                    <div className="col-lg-3">
                      <br />
                      <button
                        className="btn btn-red btn-lg w-50 mt-1 float-right"
                        onClick={(e) => {
                          e.preventDefault();
                          printBarcode("printbar");
                          console.log("Inside Onclick");
                        }}
                      >
                        Print Barcodes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-sm-12 col-lg-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Show Barcodes</h3>
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
            <div className="card-body">
              <div className="row">
                <div className="col-md-12 col-lg-12 col-sm-12">
                  <div className="row clearfix" id="printbar">
                    {Array.from({ length: numBarcodes }, (_, i) => (
                      <div
                        key={i}
                        className="col-lg-3 col-md-4 barcode-container"
                      >
                        <svg
                          className="barcode"
                          ref={(el) => (svgRefs.current[i] = el)}
                        ></svg>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GenerateBarcodes;
