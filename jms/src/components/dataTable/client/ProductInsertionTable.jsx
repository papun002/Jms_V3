import React from "react";
import SimpleTable from "../SimpleTable";
import { useEffect} from "react";

function ProductInsertionTable({ data }) {
  const [selectedRows, setSelectedRows] = React.useState([]);

  const columns = [
    { header: "Barcode", accessor: "barcode" },
    { header: "Item Type", accessor: "itype" },
    { header: "Item Name", accessor: "iname" },
    { header: "Weight", accessor: "weight" },
    { header: "PCs", accessor: "pcs" },
    { header: "HUID", accessor: "huid" },
    { header: "Size", accessor: "size" },
    { header: "Mk. Chrgs.", accessor: "mkCharges" },
    { header: "Ot. Chrgs.", accessor: "otherCharges" },
  ];

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

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Delete") {
        deleteSelectedRows();
      }
    };
  
    window.addEventListener("keydown", handleKeyDown);
  
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedRows]);

  const deleteSelectedRows = () => {
    setTableData((prevTableData) =>
      prevTableData.filter((_, index) => !selectedRows.includes(index))
    );
    setSelectedRows([]); // Clear selection after deletion
  };




  return (
    <div className="row">
      <div className="col-lg-12">
        <SimpleTable
          columns={columns}
          onSelectRow={handleSelectRow}
          selectedRows={selectedRows}
          data={data}
          tablefoot={true}
          colSpan={columns.length-4} // Adjust colSpan based on the number of columns
        />
      </div>
    </div>
  );
}

export default ProductInsertionTable;
