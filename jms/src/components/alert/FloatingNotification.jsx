import React, { useState, useEffect } from "react";
import "./FloatingNotification.css"; // Import the CSS file with styles

const FloatingNotification = ({m}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newPosition = { x: e.pageX, y: e.pageY };
      setPosition(newPosition);
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const offset = -60; // Adjust this value to change the offset from the mouse pointer
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const notificationWidth = 225; // Width of the notification element
  const notificationHeight = 38; // Height of the notification element

  // Calculate the maximum allowed position to keep the notification within the window boundaries
  const maxX = windowWidth - notificationWidth;
  const maxY = windowHeight - notificationHeight;

  // Ensure that the notification stays within the window boundaries
  const adjustedX = Math.min(Math.max(position.x + offset, 0), maxX);
  const adjustedY = Math.min(Math.max(position.y + offset, 0), maxY);

  return (
    <div className="no-data float" style={{ left: adjustedX, top: adjustedY }}>
      <i className="fa fa-caret-left fa-md arrow"></i>
      <div className="content">
        <p>
          <i className="fa fa-warning icon"></i>
        {m}
        </p>
      </div>
    </div>
  );
};

export default FloatingNotification;
