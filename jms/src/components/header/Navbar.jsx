import React from "react";
import { usePageTitle } from "../functionalities/PageTitleProvider";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ title, onLogout }) {
  const { pageTitle } = usePageTitle();
  const history = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    onLogout(true);
  };

  return (
    <div id="page_top" className="section-body top_dark">
      <div className="container-fluid">
        <div className="page-header">
          <div className="left">
            <a href={undefined} className="icon menu_toggle mr-3">
              <i className="fa  fa-align-left"></i>
            </a>
            <h1 className="page-title">{pageTitle}</h1>
          </div>
          <div className="right">
            <div className="notification d-flex">
              <div className="dropdown d-flex">
                <a
                  className="nav-link icon d-none d-md-flex btn btn-default btn-icon ml-2"
                  data-toggle="dropdown"
                >
                  <i className="fa fa-envelope"></i>
                  <span className="badge badge-success nav-unread"></span>
                </a>
                <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                  <ul className="right_chat list-unstyled w350 p-0">
                    <li className="online">
                      <a href="#;" className="media">
                        <img
                          className="media-object"
                          src="assets/images/xs/avatar4.jpg"
                          alt=""
                        />
                        <div className="media-body">
                          <span className="name">Donald Gardner</span>
                          <div className="message">
                            It is a long established fact that a reader
                          </div>
                          <small>11 mins ago</small>
                          <span className="badge badge-outline status"></span>
                        </div>
                      </a>
                    </li>
                  </ul>
                  <div className="dropdown-divider"></div>
                  <a
                    href={undefined}
                    className="dropdown-item text-center text-muted-dark readall"
                  >
                    Mark all as read
                  </a>
                </div>
              </div>
              <div className="dropdown d-flex">
                <a
                  className="nav-link icon d-none d-md-flex btn btn-default btn-icon ml-2"
                  data-toggle="dropdown"
                >
                  <i className="fa fa-bell"></i>
                  <span className="badge badge-primary nav-unread"></span>
                </a>
                <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                  <ul className="list-unstyled feeds_widget">
                    <li>
                      <div className="feeds-left">
                        <i className="fa fa-shopping-cart"></i>
                      </div>
                      <div className="feeds-body">
                        <h4 className="title">
                          7 New Orders{" "}
                          <small className="float-right text-muted">
                            11:35
                          </small>
                        </h4>
                        <small>You received a new oder from Tina.</small>
                      </div>
                    </li>
                  </ul>
                  <div className="dropdown-divider"></div>
                  <a
                    href={undefined}
                    className="dropdown-item text-center text-muted-dark readall"
                  >
                    Mark all as read
                  </a>
                </div>
              </div>
              <div className="dropdown d-flex">
                <a
                  className="nav-link icon d-none d-md-flex btn btn-default btn-icon ml-2"
                  data-toggle="dropdown"
                >
                  <i className="fa fa-user"></i>
                </a>
                <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                  <a className="dropdown-item" href="page-profile.html">
                    <i className="dropdown-icon fa fa-user"></i> Profile
                  </a>
                  <a className="dropdown-item" href="app-setting.html">
                    <i className="dropdown-icon fa fa-gear"></i> Settings
                  </a>
                  <a className="dropdown-item" href={undefined}>
                    <span className="float-right">
                      <span className="badge badge-primary">6</span>
                    </span>
                    <i className="dropdown-icon fa fa-ban"></i> Inbox
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href={undefined}>
                    <i className="dropdown-icon fa fa-help-circle"></i> Need
                    help?
                  </a>
                  <Link
                    className="dropdown-item"
                    href={undefined}
                    onClick={handleLogout}
                  >
                    <i className="dropdown-icon fa fa-log-out"></i> Sign out
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
