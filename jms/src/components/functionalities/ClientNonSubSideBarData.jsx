import React from 'react'
import Sidebar from "../header/LeftSidebar";


function ClientNonSubSideBarData() {
    const sideData = [
        { title: "Dashboard", icon: "fa fa-home" },
      ];
    
      const srtIcon = [
        {
          path: "/",
          icon: "fa fa-envelope",
          text: "Inbox",
        },
    
        {
          path: "/",
          icon: "fa fa-bell",
          text: "Notifications",
        },
        {
          path: "/sub",
          icon: "fa fa-user",
          text: "Profile",
        },
      ];
  return (
    <div>
          <Sidebar sideItem={sideData} head={"Client"} srtIcon={srtIcon} />
    </div>
  )
}

export default ClientNonSubSideBarData