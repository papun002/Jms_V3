import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { useTable } from "react-table";
import axios from "axios";
import Toast from "../../components/alert/Toast";

function DataTable({ data, columns, tablePass, action }) {
  const [toastVisible, setToastVisible] = useState(false);
  const [response, setResponse] = useState(null);
  const [selectedItemIds, setSelectedItemIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10); // Default entries per page
  const [searchTerm, setSearchTerm] = useState(""); // State to store the search term
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  const indexOfLastItem = currentPage * entriesPerPage;
  const indexOfFirstItem = indexOfLastItem - entriesPerPage;

  // Filter users based on the search term
  const filteredUsers = data.filter((user) => {
    const values = Object.values(user);
    for (let value of values) {
      if (
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return true;
      }
    }
    return false;
  });

  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const totalItems = filteredUsers.length;
  const pageNumbers = Math.ceil(totalItems / entriesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEntriesPerPageChange = (e) => {
    const newEntriesPerPage = parseInt(e.target.value, 10);
    setEntriesPerPage(newEntriesPerPage);
    setCurrentPage(1);
  };

  //search Logic
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page when the search term changes
  };

  //Excel and csv export
  const exportToCSV = () => {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = currentDate.getFullYear().toString().slice(2);
    const formattedDate = `${day}-${month}-${year}`;

    const filename = `${formattedDate}_${tablePass.tablename}.csv`;
    const csvData = [];
    csvData.push(columns.map((column) => column.Header));
    rows.forEach((row) => {
      const rowData = [];
      columns.forEach((column) => {
        rowData.push(row.values[column.accessor]);
      });
      csvData.push(rowData);
    });
    const csvFile = new Blob([csvData.join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const csvUrl = URL.createObjectURL(csvFile);
    const link = document.createElement("a");
    link.href = csvUrl;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleAll = (e) => {
    if (e.target.checked) {
      setSelectedItemIds(currentItems.map((item) => item._id));
    } else {
      setSelectedItemIds([]);
    }
  };

  const exportToExcel = () => {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = currentDate.getFullYear().toString().slice(2);
    const formattedDate = `${day}-${month}-${year}`;

    const filename = `${formattedDate}_${tablePass.tablename}.xlsx`;
    const worksheet = XLSX.utils.aoa_to_sheet([
      columns.map((column) => column.Header),
    ]);
    rows.forEach((row) => {
      const rowData = [];
      columns.forEach((column) => {
        rowData.push(row.values[column.accessor]);
      });
      XLSX.utils.sheet_add_aoa(worksheet, [rowData], { origin: -1 });
    });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, filename);
  };

  useEffect(() => {
    // console.log("Selected item ID:", selectedItemIds);
  }, [selectedItemIds]);

  const toggleSelectItem = (e, id) => {
    if (e.target.value == id && e.target.checked) {
      setSelectedItemIds([...selectedItemIds, id]);
    } else {
      setSelectedItemIds(selectedItemIds.filter((itemId) => itemId != id));
    }
  };

  const handleDeleteSelected = () => {
    console.log("Selected items to delete:", selectedItemIds);
    axios
      .delete(tablePass.delLink, {
        data: { ids: selectedItemIds },
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log("Delete response:", res.data);
        if (res.data.status === "200") {
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
      });
  };

  // toastVisible
  const handleCloseToast = () => {
    setToastVisible(false);
  };
  // toastVisible end

  const highlightText = (text, term) => {
    if (!term) return text;
    const parts = text.toString().split(new RegExp(`(${term})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === term.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: "yellow" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <>
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
          <h3 className="card-title">{tablePass.tablename}</h3>
          <div className="card-options ">
            <div className="item-action dropdown ml-2 p-0">
              <a href={undefined} data-toggle="dropdown">
                <i className="fa fa-ellipsis-v"></i>
              </a>
              <div className="dropdown-menu text-sm dropdown-menu-right">
                {selectedItemIds.length > 0 ? (
                  <a
                    href={undefined}
                    className="dropdown-item"
                    onClick={handleDeleteSelected}
                  >
                    <i className="dropdown-icon fa fa-trash"></i> Delete
                  </a>
                ) : null}
                <span>
                  <a href={undefined} className="dropdown-item">
                    <i className="dropdown-icon fa fa-refresh"></i> Refresh
                  </a>
                </span>
                <span className="dropdown-submenu">
                  <a
                    href={undefined}
                    className="dropdown-item dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    <i className="dropdown-icon fa fa-filter"></i> Filter By
                  </a>
                  <ul className=" dropdown-menu-arrow">
                    <li>
                      <a
                        href={undefined}
                        className="dropdown-item"
                        onClick={() => handleFilterChange("All")}
                      >
                        All
                      </a>
                    </li>
                    <li>
                      <a
                        href={undefined}
                        className="dropdown-item"
                        onClick={() => handleFilterChange("Stock")}
                      >
                        Stock
                      </a>
                    </li>
                    <li>
                      <a
                        href={undefined}
                        className="dropdown-item"
                        onClick={() => handleFilterChange("Out of stock")}
                      >
                        Unstock
                      </a>
                    </li>
                  </ul>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="showEntity  ">
            <div className="col-md-12 col-lg-12 col-sm-12">
              <div className="row">
                <div className="col-sm-12 col-lg-3 col-md-4">
                  <div className="search d-flex mt-2">
                    <span>Show</span>
                    <select
                      className="form-control ml-2 mr-2 mt-1 w-30"
                      onChange={handleEntriesPerPageChange}
                      value={entriesPerPage}
                      style={{
                        position: "relative",
                        bottom: "10px",
                        width: "70px",
                      }}
                    >
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </select>
                    <span>entries</span>
                  </div>
                </div>
                <div className="col-sm-12 col-lg-3 col-md-4 mb-3 text-center">
                  <div className="input-btn mb-2">
                    <button className="btn btn-red btn-lg mr-1">
                      <i className="fa fa-print"></i>
                    </button>
                    <button
                      className="btn btn-red btn-lg mr-1"
                      onClick={exportToExcel}
                    >
                      <i className="fa fa-file-excel-o"></i>
                    </button>
                    <button
                      className="btn btn-red btn-lg mr-1"
                      onClick={exportToCSV}
                    >
                      <i className="fa fa-file-pdf-o"></i>
                    </button>
                  </div>
                </div>
                <div className="col-sm-12 col-lg-3 col-md-4">
                  <div className="input-search">
                    <input
                      className="form-control float-right mb-2"
                      placeholder="Anything to Search..."
                      type="search"
                      style={{ position: "relative" }}
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />{" "}
                  </div>
                </div>
                <div className="col-sm-12 col-lg-3 col-md-4"></div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="table-responsive">
              <table className="table table-striped v_center" id="myTable">
                <thead>
                  <tr>
                    <th>
                      <input type="checkbox" onChange={(e) => toggleAll(e)} />
                    </th>
                    {columns.map((column, index) => (
                      <th key={index}>{column.Header}</th>
                    ))}
                   {action == true ? <th>Action</th> : null}  
                  </tr>
                </thead>
                <tbody className="font-weight-normal" style={{padding:"2px"}}>
                  {currentItems.length > 0 ? (
                    currentItems.map((i, rowIndex) => {
                      return (
                        <tr key={rowIndex} className="text-capitalize">
                          <td>
                            <input
                              type="checkbox"
                              checked={selectedItemIds.includes(i._id)}
                              value={i._id}
                              onChange={(e) => toggleSelectItem(e, i._id)}
                            />
                          </td>
                          {columns.map((column, colIndex) => (
                            <td key={colIndex}>
                              {column.accessor === "sts" ? (
                                i[column.accessor] === "In Stock" ? (
                                  <span className="tag tag-info">{i[column.accessor]}</span>
                                ) : (
                                  <span className="tag tag-red">
                                    {i[column.accessor]}
                                  </span>
                                )
                              ) : (
                                <span>
                                  {highlightText(
                                    i[column.accessor],
                                    searchTerm
                                  )}
                                </span>
                              )}
                            </td>
                          ))}
                          {action == true ? <td>
                            <span>
                              <button
                                data-toggle="modal"
                                data-target="#staticBackdrop"
                                className="btn btn-red btn-sm"
                              >
                                Details
                              </button>
                            </span>
                          </td> : null}
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={columns.length + 2}>
                        <h3 className="text-center card-title">
                          No Data found in this Table..
                        </h3>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Pagination */}
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <span>
              Showing &nbsp;{indexOfFirstItem + 1} to {indexOfLastItem} of{" "}
              {totalItems}
            </span>
            <nav aria-label="...">
              <ul className="pagination">
                <li
                  className={`page-item${currentPage === 1 ? " disabled" : ""}`}
                >
                  <a
                    className="page-link"
                    href="#"
                    onClick={() => paginate(currentPage - 1)}
                    tabIndex="-1"
                  >
                    Previous
                  </a>
                </li>
                {Array.from({ length: Math.min(3, pageNumbers) }).map(
                  (_, index) => {
                    const pageNumber = index + 1;
                    const isCurrentPage = currentPage === pageNumber;

                    return (
                      <li
                        key={index}
                        className={`page-item${isCurrentPage ? " active" : ""}`}
                      >
                        <a
                          className="page-link"
                          href="#"
                          onClick={() => paginate(pageNumber)}
                        >
                          {pageNumber}
                        </a>
                      </li>
                    );
                  }
                )}
                {currentPage > 3 && (
                  <li className="page-item disabled">
                    <span className="page-link">...</span>
                  </li>
                )}
                {currentPage > 3 && (
                  <li className="page-item active">
                    <a
                      className="page-link "
                      href="#"
                      onClick={() => paginate(currentPage)}
                    >
                      {currentPage}
                    </a>
                  </li>
                )}
                <li
                  className={`page-item${
                    currentPage === pageNumbers ? " disabled" : ""
                  }`}
                >
                  <a
                    className="page-link"
                    href="#"
                    onClick={() => paginate(currentPage + 1)}
                  >
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default DataTable;
