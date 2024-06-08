import React from "react";

function HeaderIntroduction({ introText}) {
  const name = localStorage.getItem("name");

  return (
    <div>
      <div className="row clearfix">
        <div className="col-lg-12">
          <div className="mb-4">
            <h4>Welcome <span style={{color:"#E74C3C"}}>{name}!</span> </h4>
            <small>
              {introText}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderIntroduction;
