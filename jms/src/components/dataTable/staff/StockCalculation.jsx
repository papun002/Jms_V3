import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner, Alert } from "react-bootstrap";
import CategoryItemsModal from "../../modal/staff/CategoryItemsModal";

function StockCalculation() {
  const [stockData, setStockData] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const fetchStockData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/staffs/pdt/getAllProducts",
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      setStockData(res.data.data);
      calculateCategoryCounts(res.data.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching data");
      setLoading(false);
    }
  };

  const calculateCategoryCounts = (data) => {
    const counts = data.reduce((acc, item) => {
      if (item.cname) {
        acc[item.cname] = (acc[item.cname] || 0) + 1;
      }
      return acc;
    }, {});
    setCategoryCounts(counts);
  };

  useEffect(() => {
    fetchStockData();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCategory(null);
  };

  const getCategoryItems = (category) => {
    return stockData.filter((item) => item.cname === category);
  };

  const filteredCategories = Object.entries(categoryCounts).filter(
    ([category]) => category.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <Spinner animation="border" variant="primary" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div className="col-12">
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover table-striped table-vcenter mb-0 text-nowrap">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Items</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map(([category, count], key) => (
                  <tr key={key} onClick={() => handleCategoryClick(category)}>
                    <td >
                      {category}
                    </td>
                    <td>{count}</td>
                    <td style={{ color: "blue", cursor: "pointer" }}>View Items</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {selectedCategory && (
        <CategoryItemsModal
          show={showModal}
          handleClose={handleCloseModal}
          category={selectedCategory}
          items={getCategoryItems(selectedCategory)}
        />
      )}
    </div>
  );
}

export default StockCalculation;
