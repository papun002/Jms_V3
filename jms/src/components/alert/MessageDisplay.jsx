import React, { useEffect } from "react";
import Swal from "sweetalert2";

const MessageDisplay = ({ title, icon, message }) => {
  Swal.fire({
    title: title,
    icon: icon,
    text: message,
    showClass: {
      popup: `
        animate__animated
        animate__rotateInDownLeft
        animate__faster
      `,
      hide: `animate__animated
        animate__rotateOutDownRight
        animate__faster
      `,
    },
  });
};

export default MessageDisplay;
