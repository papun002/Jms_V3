import React from "react";
import EditableTable from "../../components/dataTable/EditableTable";

function apx() {

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Age",
        accessor: "age",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Date of Birth",
        accessor: "dob",
      },
    ],
    []
  );

  const data = React.useMemo(
    () => [
      {
        name: "John Doe",
        age: 28,
        email: "john@example.com",
        dob: "1996-02-15",
      },
      {
        name: "Jane Smith",
        age: 34,
        email: "jane@example.com",
        dob: "1990-08-22",
      },
    ],
    []
  );
  return (
    <div>
      <EditableTable columns={columns} data={data} />
    </div>
  );
}

export default apx;
