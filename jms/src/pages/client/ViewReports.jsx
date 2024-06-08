import { React, useEffect } from "react";
import { usePageTitle } from "../../components/functionalities/PageTitleProvider";
// import DataTable from "../../components/dataTable/DataTable";

function ViewReports() {
  const { handlePageTitleChange } = usePageTitle();

  useEffect(() => {
    handlePageTitleChange("Selling History");
    return () => {
      handlePageTitleChange("Empty");
    };
  }, [handlePageTitleChange]);



  const header = [
    "Name",
    "Contact ",
    "Email",
    "Profile",
    "Username",
    "Password",
    "Status",
  ];
  const tableName = "Stock Report";
  const users = [];
  return (
    <div>
      <div className="row">
        {/* <DataTable header={header} tableName={tableName} users={users} /> */}
      </div>
    </div>
  );
}

export default ViewReports;
