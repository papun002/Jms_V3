import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function CategoryItemsModal({ show, handleClose, category, items }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Function to filter items based on search term (matches from first letter)
  const filteredItems = items.filter(item =>
    item.pname.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const calculateTotalWeight = () => {
    let totalWeight = 0;
    items.forEach((item) => {
      const weight = parseFloat(item.pweight);
      if (!isNaN(weight)) {
        totalWeight += weight;
      }
    });
    return totalWeight.toFixed(2);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header>
        <Modal.Title className="">Items in {category}</Modal.Title>
        <Modal.Title className=""> <input
          className="form-control"
          type="search"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
        /></Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: 'calc(100vh - 210px)', overflowY: 'auto' }}>
        {filteredItems.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-hover table-striped table-vcenter mb-0 text-nowrap">
              <thead className="tag-red">
                <tr>
                  <th className="text-white">Sl No.</th>
                  <th className="text-white">Item Name</th>
                  <th className="text-white">Barcode</th>
                  <th className="text-white">HUID</th>
                  <th className="text-white">Weight</th>
                  <th className="text-white">Description</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.pname}</td>
                    <td>{item.pbarcode}</td>
                    <td>{item.phuid}</td>
                    <td>{item.pweight}</td>
                    <td>{item.pdescription}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="5" className="font-weight-bold">
                    <span>Total Items: {filteredItems.length}</span>
                  </td>
                  <td className="text-right font-weight-bold">
                    <span>Total Wt: {calculateTotalWeight()} gm</span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          <p>No items found matching the search criteria.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CategoryItemsModal;
