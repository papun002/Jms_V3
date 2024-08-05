import React, { useEffect } from "react";
import { usePageTitle } from "../../components/functionalities/PageTitleProvider";
import AdminCardEmbbed from "../../components/functionalities/ClientCardEmbbed";
import HeaderIntroduction from "../../components/header/HeaderIntroduction";
import Piechart3D from "../../components/graph/Piechart3D";
import ReportCards from "../../components/functionalities/Staff Functionalities/cards/ReportCards";
import SettingsCards from "../../components/functionalities/Staff Functionalities/cards/SettingsCards";

const StaffHome = () => {
  const { handlePageTitleChange } = usePageTitle();

  useEffect(() => {
    handlePageTitleChange("Staff Dashboard");
    return () => {
      handlePageTitleChange("Empty"); // Fix the typo here
    };
  }, [handlePageTitleChange]);

  const introText =
    "Welcome to your dashboard, kindly manage your products, orders, and users from here.";
  return (
    <div className="mt-3">
      <>
        <HeaderIntroduction introText={introText} />
        <div className=" row">
          <div className="col-lg-8 col-md-6 col-sm-12">
            <div className="row">
              <ReportCards />
            </div>
            <div className="row">
              <SettingsCards />
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="row">
              <div className="card" style={{background:"transparent", border:"none"}}>
                <Piechart3D />
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default StaffHome;
