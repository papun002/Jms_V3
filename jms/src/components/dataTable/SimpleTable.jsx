import React, { useState } from "react";
import "./SimpleTable.css"; // Import the CSS file for styles

const SimpleTable = ({
  columns,
  data,
  onSelectRow,
  selectedRows,
  tablefoot,
  colSpan,
  rowSpan
}) => {
  // Add serial number column to columns
  const enhancedColumns = [
    { header: "Select", accessor: "select" },
    { header: "Sl No", accessor: "slno" },
    ...columns,
  ];

  // Add serial numbers to data
  const enhancedData = data.map((item, index) => ({
    ...item,
    slno: index + 1, // Add serial number
  }));

  const handleSelectRow = (index) => {
    onSelectRow(index);
  };

  const handleSelectAll = () => {
    if (selectedRows.length === enhancedData.length) {
      onSelectRow(null, true); // Deselect all
    } else {
      enhancedData.forEach((_, index) => onSelectRow(index));
    }
  };

  return (
    <div className="table-simple-container">
      <table className="table-simple table-striped">
        <thead>
          <tr>
            {enhancedColumns.map((column) => (
              <th key={column.accessor}>
                {column.accessor === "select" ? (
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedRows.length === enhancedData.length}
                    aria-label="Select all"
                  />
                ) : column.accessor === "actions" ? null : ( // No need for actions in the header
                  column.header
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {enhancedData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {enhancedColumns.map((column) => (
                <td key={column.accessor}>
                  {column.accessor === "select" ? (
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(rowIndex)}
                      onChange={() => handleSelectRow(rowIndex)}
                      aria-label={`Select row ${rowIndex + 1}`}
                    />
                  ) : (
                    // ) : column.accessor === "actions" ? (
                    //   <IconButton
                    //     color="error"
                    //     onClick={() => handleDeleteSingle(rowIndex)}
                    //     aria-label="Delete row"
                    //   >
                    //     <FaTrashAlt />
                    //   </IconButton>
                    row[column.accessor]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {tablefoot == true ? (
          <tfoot className="font-weight-bold">
            <tr>
              <td  colSpan={colSpan}>Total: <span>736</span></td>
              <td className="text-right">6464</td>
              <td colSpan={colSpan}></td>
            </tr>
          </tfoot>
        ) : null}
      </table>
    </div>
  );
};

export default SimpleTable;
