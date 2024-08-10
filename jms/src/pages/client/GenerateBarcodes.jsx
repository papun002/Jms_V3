import React, { useState, useRef, useEffect } from "react";
import JsBarcode from "jsbarcode";
import "../../../public/assets/css/barcode.css";
import { usePageTitle } from "../../components/functionalities/PageTitleProvider";
import Swal from 'sweetalert2'; // Ensure Swal is imported

function GenerateBarcodes() {
  const [barcodeFormat, setBarcodeFormat] = useState("CODE128");
  const [numBarcodes, setNumBarcodes] = useState(0);
  const [barcodePrefix, setBarcodePrefix] = useState("");
  const [barcodeLength, setBarcodeLength] = useState(6);
  const svgRefs = useRef([]);

  const handleFormatChange = (e) => {
    setBarcodeFormat(e.target.value);
  };

  const handleNumBarcodesChange = (e) => {
    setNumBarcodes(Number(e.target.value));
  };

  const handlePrefixChange = (e) => {
    setBarcodePrefix(e.target.value);
  };

  const handleLengthChange = (e) => {
    setBarcodeLength(Number(e.target.value));
  };

  const generateUniqueValue = () => {
    const uniqueNumber = Math.floor(Math.pow(10, barcodeLength - 1) + Math.random() * (Math.pow(10, barcodeLength) - Math.pow(10, barcodeLength - 1) - 1));
    return `${barcodePrefix}${uniqueNumber}`;
  };

  const printBarcodes = (printId) => {
    if (numBarcodes <= 0) {
      Swal.fire({
        title: "Error",
        text: "Number of barcodes must be greater than 0!",
        icon: "error",
      });
      return;
    }

    const printContents = document.getElementById(printId).innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };

  useEffect(() => {
    svgRefs.current.forEach((svg, i) => {
      if (svg) {
        const uniqueValue = generateUniqueValue();
        JsBarcode(svg, uniqueValue, {
          format: barcodeFormat,
          width: 2,
          height: 30,
        });
      }
    });
  }, [barcodeFormat, numBarcodes, barcodePrefix, barcodeLength]);

  const { handlePageTitleChange } = usePageTitle();

  useEffect(() => {
    handlePageTitleChange("Barcode Section");
    return () => handlePageTitleChange("Empty");
  }, [handlePageTitleChange]);

  return (
    <>
      <div className="row mt-3">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Barcode Section</h3>
              <div className="card-options">
                <a href="#" className="card-options-collapse" data-toggle="card-collapse">
                  <i className="fa fa-chevron-up"></i>
                </a>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4 col-lg-3">
                  <label>Barcode Prefix:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={barcodePrefix}
                    onChange={handlePrefixChange}
                  />
                </div>
                <div className="col-md-4  col-lg-3">
                  <label>Barcode Length:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={barcodeLength}
                    onChange={handleLengthChange}
                    min="1"
                  />
                </div>
                <div className="col-md-4  col-lg-3">
                  <label>Number of Barcodes:</label>
                  <input
                    type="number"
                    className="form-control"
                    value={numBarcodes}
                    onChange={handleNumBarcodesChange}
                    min="1"
                    required
                  />
                </div>
                <div className="col-md-4  col-lg-3 mt-4">
                  <button
                    className="btn btn-red btn-lg w-50" style={{float:'right'}}
                    onClick={() => printBarcodes("printbar")}
                  >
                    Print Barcodes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Show Barcodes</h3>
              <div className="card-options">
                <a href="#" className="card-options-collapse" data-toggle="card-collapse">
                  <i className="fa fa-chevron-up"></i>
                </a>
              </div>
            </div>
            <div className="card-body">
              <div className="row clearfix" id="printbar">
                {Array.from({ length: numBarcodes }, (_, i) => (
                  <div key={i} className="col-lg-3 col-md-4 barcode-container">
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
    </>
  );
}

export default GenerateBarcodes;
