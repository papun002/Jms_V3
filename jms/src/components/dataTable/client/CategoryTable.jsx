import React, { useState, useEffect } from "react";
import axios from "axios";
import SimpleTable from "../SimpleTable";
import IconButton from "@mui/material/IconButton"; // Import Material UI IconButton component
import { FaTrashAlt } from "react-icons/fa"; // Import delete icon
import Swal from "sweetalert2"; // Import SweetAlert2

function CategoryTable() {
  const [catData, setCatData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("22K916");
  const [selectedRows, setSelectedRows] = useState([]);

  const columns = [
    { header: "Category Type", accessor: "pdt_type" },
    { header: "Category Name", accessor: "cat_name" },
  ];

  const fetchingCategory = async (category) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "http://localhost:4000/client/cat/getcategory",
        {
          params: { category },
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      setCatData(response.data.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch category data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchingCategory(selectedCategory);
  }, [selectedCategory]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleDeleteSelected = async () => {
    try {
      const dataToDelete = selectedRows.map((index) => ({
        id: catData[index]._id,
        name: catData[index].cat_name,
        category: catData[index].pdt_type,
      }));

      await axios.delete("http://localhost:4000/client/cat/bulkdeletecategory", {
        data: dataToDelete,
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });

      fetchingCategory(selectedCategory); // Refresh the category data after deletion
      setSelectedRows([]); // Clear selection

      // Show success alert
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Categories Deleted Successfully!',
        toast: true,
        position: 'top-right',
        timer: 5000,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
      setError("Failed to delete category data.");

      // Show error alert
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to delete categories.',
        toast: true,
        position: 'top-right',
        timer: 5000,
        showConfirmButton: false,
      });
    }
  };

  const handleSelectRow = (index, deselectAll = false) => {
    if (deselectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows((prevSelectedRows) =>
        prevSelectedRows.includes(index)
          ? prevSelectedRows.filter((i) => i !== index)
          : [...prevSelectedRows, index]
      );
    }
  };

  return (
    <>
      <div className="mt-3 row">
        <div className="col-lg-12 col-sm-12 col-md-12">
          <div className="row">
            <div className="col-lg-2 col-sm-12 col-md-6">
              <IconButton
                className="ml-2"
                color="error"
                onClick={handleDeleteSelected}
                disabled={selectedRows.length === 0}
                aria-label="Delete selected"
              >
                <FaTrashAlt />
              </IconButton>
            </div>
            <div className="col-lg-10 col-sm-12 col-md-6">
              <div className="form-group row mr-3" style={{ float: 'right' }}>
                <div className="col-sm-12 mr-5">
                  <select
                    className="form-control mr-5"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                  >
                    <option value="22K916">Gold 22K916</option>
                    <option value="gold 22K">Gold 22K</option>
                    <option value="silver 92">Silver 92</option>
                    <option value="silver">Silver</option>
                    <option value="diamond">Diamond</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 col-sm-12 col-md-12">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <SimpleTable
              columns={columns}
              data={catData}
              onSelectRow={handleSelectRow}
              selectedRows={selectedRows}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default CategoryTable;
