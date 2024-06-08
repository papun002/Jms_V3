import React, { useState } from 'react';

function FilterModal({ show, onClose, onApply }) {
  const [column, setColumn] = useState('');
  const [value, setValue] = useState('');

  const handleApply = () => {
    onApply({ column, value });
    onClose();
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Filter</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="column">Column</label>
              <select
                id="column"
                className="form-control"
                value={column}
                onChange={(e) => setColumn(e.target.value)}
              >
                <option value="">Select Column</option>
                <option value="sts">Status</option>
                <option value="category">Category</option>
                {/* Add other columns as needed */}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="value">Value</label>
              <input
                id="value"
                type="text"
                className="form-control"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={handleApply}>
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterModal;
