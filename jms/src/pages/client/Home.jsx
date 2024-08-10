import { React, useEffect } from "react";
import { usePageTitle } from "../../components/functionalities/PageTitleProvider";
import HeaderIntroduction from "../../components/header/HeaderIntroduction";

import verification from "../../context/Context";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../utils/Authrize";
import Analytics from "../../components/graph/Analytics";
import SalesCard from "../../components/functionalities/client function/SalesCard";
import SetRatesCard from "../../components/functionalities/client function/SetRatesCard";
function Home() {
  const { handlePageTitleChange } = usePageTitle();

  useEffect(() => {
    handlePageTitleChange("Client Dashboard");
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
        <div className="row">
          <div className="col-lg-6">
            <div className="row">
              <div className="col-lg-12">
                <SalesCard />
              </div>
            </div>
            <div className="row">
              <p>Set Rates</p>

              <SetRatesCard />
            </div>
          </div>
          <div className="col-lg-6">
            <Analytics />
          </div>
        </div>
        <div className=" row clearfix row-deck"></div>
      </>
    </div>
  );
}

export default Home;
