import React, { useState, useEffect } from "react";

function Settings() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);
  const [isSidebarDark, setIsSidebarDark] = useState(false);
  const [isHeaderDark, setIsHeaderDark] = useState(false);
  const [isTopBarDark, setIsTopBarDark] = useState(false);

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode");
  };

  const handleNavbarToggle = () => {
    setIsNavbarFixed(!isNavbarFixed);
    document.getElementById("page_top").classList.toggle("sticky-top");
  };

  const handleSidebarToggle = () => {
    setIsSidebarDark(!isSidebarDark);
    document.body.classList.toggle("sidebar_dark");
    document.getElementById("header_top").classList.toggle("dark");
  };

  const handleHeaderToggle = () => {
    setIsHeaderDark(!isHeaderDark);
    document.getElementById("page_top").classList.toggle("top_dark");
  };

  return (
    <div>
      <ul className="setting-list list-unstyled mt-1 setting_switch">
        <li>
          <label className="custom-switch">
            <span className="custom-switch-description">Night Mode</span>
            <input
              type="checkbox"
              className="custom-switch-input btn-darkmode"
              checked={isDarkMode}
              onChange={handleDarkModeToggle}
            />
            <span className="custom-switch-indicator"></span>
          </label>
        </li>
        <li>
          <label className="custom-switch">
            <span className="custom-switch-description">
              Fix Navbar top
            </span>
            <input
              type="checkbox"
              className="custom-switch-input btn-fixnavbar"
              checked={isNavbarFixed}
              onChange={handleNavbarToggle}
            />
            <span className="custom-switch-indicator"></span>
          </label>
        </li>
        <li>
          <label className="custom-switch">
            <span className="custom-switch-description">Header Light</span>
            <input
              type="checkbox"
              className="custom-switch-input btn-pageheader"
              checked={isHeaderDark}
              onChange={handleHeaderToggle}
            />
            <span className="custom-switch-indicator"></span>
          </label>
        </li>
        <li>
          <label className="custom-switch">
            <span className="custom-switch-description">Sidebar Dark</span>
            <input
              type="checkbox"
              className="custom-switch-input btn-sidebar"
              checked={isSidebarDark}
              onChange={handleSidebarToggle}
            />
            <span className="custom-switch-indicator"></span>
          </label>
        </li>
      </ul>
    </div>
  );
}

export default Settings;
