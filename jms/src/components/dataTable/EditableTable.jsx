import React, { useState, useEffect } from "react";
import { useTable, useBlockLayout } from "react-table";
import "./EditableTable.css"; // Import your CSS file here

const EditableTable = ({ columns, data }) => {
  const [tableData, setTableData] = useState(data);

  const updateMyData = (rowIndex, columnId, value) => {
    setTableData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...row,
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  const defaultColumn = {
    Cell: EditableCell,
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data: tableData,
      defaultColumn,
      updateMyData,
    },
    useBlockLayout
  );

  function EditableCell({
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData,
  }) {
    const [value, setValue] = useState(initialValue);

    const onChange = (e) => {
      setValue(e.target.value);
    };

    const onBlur = () => {
      updateMyData(index, id, value);
    };

    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    return (
      <input
        type="text"
        className="no-border"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    );
  }

  // Function to calculate totals (example for illustration)
  const calculateTotal = (columnId) => {
    return tableData.reduce((total, row) => total + (parseFloat(row[columnId]) || 0), 0).toFixed(2);
  };

  return (
    <div className="table-responsive">
      <table className="tablex v_center bg-white" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className={`col-${column.id}`}
                  style={{ width: column.width }}
                >
                  {column.render("Header")}
                  {column.cat && (
                    <small style={{float:'right'}} ><a className="text-red" href="">{column.cat}</a></small>)}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className={row.original.someData ? "data-row" : ""}
              >
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className={`col-${cell.column.id}`}
                    style={{ width: cell.column.width }}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
          <tr>
            <td colSpan={2} style={{background: "beige"}}>Total</td>
            <td style={{background: "beige"}}>{calculateTotal("col1")}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EditableTable;
