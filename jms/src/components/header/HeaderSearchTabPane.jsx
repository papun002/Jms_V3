import React from "react";

function HeaderSearchTabPane({ firstData, secondData, multipleTabs }) {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="d-flex justify-content-between align-items-center">
          {multipleTabs ? (
            multipleTabs && (
              <ul className="nav nav-tabs page-header-tab">
                {multipleTabs.map((tab, index) => (
                  <li className="nav-item" key={index}>
                    <a
                      className={`nav-link ${index === 0 ? "active" : ""}`}
                      data-toggle="tab"
                      href={`#${tab.id}`}
                    >
                      {tab.name}
                    </a>
                  </li>
                ))}
              </ul>
            )
          ) : (
            <ul className="nav nav-tabs page-header-tab">
              <li className="nav-item">
                <a className="nav-link active" data-toggle="tab" href="#addnew">
                  {firstData}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#list">
                  {secondData}
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeaderSearchTabPane;
