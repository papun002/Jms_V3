import React, { useState, useEffect } from "react";
import "./toast.css";

const Toast = ({ message, duration = 3000, onClose, type }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return visible ? (
    <div className="toast-container">
    <div className={`alert alert-${type}`}>
      <div className="icon">
        {type === "success" && <i className="fa fa-check-circle"></i>}
        {type === "error" && <i className="fa fa-times-circle"></i>}
        {type === "info" && <i className="fa fa-info-circle"></i>}
        {type === "warning" && <i className="fa fa-exclamation-circle"></i>}
      </div>
      <div className="alert-content">
        <div className="alert-title">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </div>
        {message}
      </div>
    </div>
    </div>
  ) : null;
};

export default Toast;
