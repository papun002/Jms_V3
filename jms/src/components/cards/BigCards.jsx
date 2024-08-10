import React from "react";
import { Link } from "react-router-dom";

function BigCards({ index, img, name, contact, id, sts }) {
  return (
    <div className="col-xl-4 col-lg-4 col-md-6" key={index}>
      <div className="card">
        <div className="card-body ribbon">
          <div className="ribbon-box green" style={{ zIndex: "9999" }}>
            {" "}
            {sts === "active" ? (
              <span className="">Active</span>
            ) : (
              <span className="d">Deactivate</span>
            )}
          </div>
          <div className="row">
            <div className="col-md-4">
              <img
                className="rounded-circle img-thumbnail w100"
                src={img?img:`/assets/images/noImg.jpg`}
                alt=""
              />
            </div>
            <div className="col-md-8">
              <div className="mb-0">{name}</div>
              <div>Contact: {contact}</div>
            <Link
              style={{ float: "right" }}
              to={{
                pathname: `/profile/-${name}-${localStorage.getItem("token")}`,
                search: `?id=${id}`,
              }}
              className="btn btn-red btn-sm mt-5"
            >
              View
            </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BigCards;
