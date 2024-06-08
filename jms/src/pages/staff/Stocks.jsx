import React from "react";
import HeaderSearchTabPane from "../../components/header/HeaderSearchTabPane";
import { usePageTitle } from "../../components/functionalities/PageTitleProvider";
import { useEffect, useState } from "react";
import ProductTable from "../../components/dataTable/staff/ProductTable";
import CategoryTable from "../../components/dataTable/staff/CategoryTable";

function Stocks() {
  const { handlePageTitleChange } = usePageTitle();
  //page title start
  useEffect(() => {
    handlePageTitleChange("Stocks Section");
    return () => {
      handlePageTitleChange("Empty");
    };
  }, [handlePageTitleChange]);
  //page title end

  //multiple tabs data
  const multipleTabs = [
    { id: "items", name: "All Items" },
    { id: "category", name: "Category" },
    { id: "stockcal", name: "Stock Calculation" },
    { id: "stockmen", name: "Stock Maintenance" },
  ];
  return (
    <div>
      <HeaderSearchTabPane multipleTabs={multipleTabs} />
      <div className="tab-content">
        <div className="tab-pane fade show active" id="items" role="tabpanel">
          <div className="col-12">
            <div className="row">
              <ProductTable />
            </div>
          </div>
        </div>
        <div
          className="tab-pane fade show"
          id="category"
          role="tabpanel"
        >
          <div className="col-12">
            <div className="row">
            <CategoryTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stocks;
