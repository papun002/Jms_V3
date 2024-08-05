import React from 'react'

function Sales() {
  return (
    <div>
      <ul className="setting-list list-unstyled mt-1 setting_switch  text-red">
        <li>
          <label className="custom-switch">
            <span className="custom-switch-description text-dark">22K916 Gold:</span>
            <span className="">6570.00</span>
          </label>
        </li>
        <li>
          <label className="custom-switch">
            <span className="custom-switch-description text-dark">92.5 Silver:</span>
            <span>200.00</span>
          </label>
        </li>
        <li>
          <label className="custom-switch">
            <span className="custom-switch-description text-dark">Silver: </span>
            <span>93.00</span>
          </label>
        </li>
      </ul>
    </div>
  )
}

export default Sales