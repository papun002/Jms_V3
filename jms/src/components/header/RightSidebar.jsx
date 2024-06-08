import React from "react";
import { useState } from "react";
import SettingsComponent from "./setting/SettingsComponent";

function RightSidebar({ handleToggleSidebar }) {
  const [selectedFont, setSelectedFont] = useState("font-montserrat");

  //close sidebar
  const handleClose = () => {
    handleToggleSidebar(false);
  };
  //close sidebar end

  //font changing
  const handleFontSettingChange = (e) => {
    const currentValue = e.target.value;
    setSelectedFont(currentValue);
    const radioButtons = document.querySelectorAll(`[name='${e.target.name}']`);

    radioButtons.forEach((radio) => {
      const value = radio.value;
      document.body.classList.remove(value);
    });

    document.body.classList.add(currentValue);
  };
  //font changing end
  return (
    <div
      id="rightsidebar"
      className={`right_sidebar ${handleToggleSidebar ? "open" : ""}`}
    >
      <a
        href={undefined}
        className="p-3 settingbar float-right"
        onClick={handleClose}
      >
        <i className="fa fa-close"></i>
      </a>
      <div className="p-4">
        <div className="mb-4">
          <h6 className="font-14 font-weight-bold text-muted">Font Style</h6>
          <div className="custom-controls-stacked font_setting">
            <label className="custom-control custom-radio custom-control-inline">
              <input
                type="radio"
                className="custom-control-input"
                name="font"
                value="font-opensans"
                checked={selectedFont === "font-opensans"}
                onChange={handleFontSettingChange}
              />
              <span className="custom-control-label">Open Sans Font</span>
            </label>
            <label className="custom-control custom-radio custom-control-inline">
              <input
                type="radio"
                className="custom-control-input"
                name="font"
                value="font-montserrat"
                checked={selectedFont === "font-montserrat"}
                onChange={handleFontSettingChange}
              />
              <span className="custom-control-label">
                Montserrat Google Font
              </span>
            </label>
            <label className="custom-control custom-radio custom-control-inline">
              <input
                type="radio"
                className="custom-control-input"
                name="font"
                value="font-roboto"
                checked={selectedFont === "font-roboto"}
                onChange={handleFontSettingChange}
              />
              <span className="custom-control-label">Robot Google Font</span>
            </label>
          </div>
        </div>
        <hr />
        <div>
          <h6 className="font-14 font-weight-bold mt-4 text-muted">
            General Settings
          </h6>
          <SettingsComponent/>
        </div>
        <hr />
      </div>
    </div>
  );
}

export default RightSidebar;
