import React, { useState, useEffect } from "react";
import axios from "axios";

function CategoryItemCalculation() {
  const [selectedProductType, setSelectedProductType] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [CatItem, setCatItem] = useState([]);
  const [loadingCatItem, setLoadingCatItem] = useState(false);
  const [itemCountMap, setItemCountMap] = useState({});

  // Fetching category data from server
  const fetchingCategory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/staffs/cat/getAllcat",
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      setFilteredCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetching CatItem based on selected category
  const fetchCatItem = async (categoryId) => {
    setLoadingCatItem(true);
    try {
      const response = await axios.get(
        `http://localhost:4000/staffs/getItemsByCategory/${categoryId}`,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      const catItems = response.data.data;
      setCatItem(catItems);
      console.log("CatItem:", catItems);

      // Count occurrences of each pname
      const countMap = {};
      catItems.forEach((item) => {
        const pname = item.pname;
        if (countMap[pname]) {
          countMap[pname] += 1;
        } else {
          countMap[pname] = 1;
        }
      });
      setItemCountMap(countMap);
    } catch (error) {
      console.error("Error fetching CatItem:", error);
    } finally {
      setLoadingCatItem(false);
    }
  };

  useEffect(() => {
    fetchingCategory();
  }, []);

  const handleProductTypeChange = (e) => {
    const selectedType = e.target.value;
    setSelectedProductType(selectedType);
    // Reset selected category and CatItem when product type changes
    setSelectedCategory("");
    setCatItem([]);
    // Filter categories based on the selected product type
    const filteredCats = filteredCategories.filter(
      (cat) => cat.pdt_type === selectedType
    );
    setFilteredCategories(filteredCats);
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setSelectedCategory(selectedCategoryId);
    // Fetch CatItem based on the selected category
    fetchCatItem(selectedCategoryId);
  };

  return (
    <div className="row">
      <div className="mb-3 col-lg-6 col-md-6 col-sm-12">
        <div className="form-group">
          <label htmlFor="productType">Ornaments Type</label>
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
      <div className="mb-3 col-lg-6 col-md-6 col-sm-12">
        <div className="form-group">
          <label htmlFor="category">Select Category</label>
          <select
            className="form-control"
            name="cat"
            id="category"
            onChange={handleCategoryChange}
            value={selectedCategory}
          >
            <option value="">Select Category</option>
            {filteredCategories.map((cat) => (
              <option key={cat._id} value={cat.cat_name}>
                {cat.cat_name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="col-12">
        {loadingCatItem ? (
          <p>Loading CatItem...</p>
        ) : CatItem.length > 0 ? (
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover table-striped table-vcenter mb-0 text-nowrap" style={{ maxHeight: 'calc(100vh - 210px)', overflowY: 'auto' }}>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Item</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(itemCountMap).map((pname) => (
                        <tr>
                          <td><span>{pname}</span></td>
                          <td><span>{itemCountMap[pname]}</span></td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={2} className="font-weight-bold">
                            <span>Total Items: {CatItem.length}</span>
                            </td>
                        </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
        ) : (
          <p>No Category Items found for the selected category.</p>
        )}
      </div>
    </div>
  );
}

export default CategoryItemCalculation;
