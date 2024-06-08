import React from "react";
import { Link } from "react-router-dom";

function BigCards({ index, img, name, contact, id }) {
  return (
    <div className="col-xl-4 col-lg-4 col-md-6" key={index}>
      <div className="card">
        <div className="card-body text-center">
          <img
            className="rounded-circle img-thumbnail w100"
            src={img}
            alt=""
          />
          <h6 className="mt-3 mb-0">{name}</h6>
          <span>Contact: {contact}</span>
          <br /> <br />
          <Link
            to={{ pathname: `/profile/${localStorage.getItem("uid")}-${name}-${localStorage.getItem("token")}`, search: `?id=${id}` }}
            className="btn btn-red btn-sm"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BigCards;
