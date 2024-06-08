import React from 'react'
import Sidebar from '../../../header/LeftSidebar'

function StaffNavbar() {
    const StaffSidebarData = [
        { title: "Dashboard", path: "/staff/dashboard", icon: "fa fa-home" },
        {
          category: "customer",
          title: "Customer Section",
          path: "/staff/customer",
          icon: " fa fa-users",
        },
        {
          category: "stocks",
          title: "Stocks Section",
          icon: " fa fa-product-hunt",
          path: "/staff/stocks",
        },
        {
          category: "Orders",
          title: "Orders Section",
          icon: " fa fa-shopping-cart",
          path: "/staff/orders",
        },
        { category: "History",title: "Reports", path: "/reports", icon: "fa fa-bar-chart" },
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
          path: "/profile",
          icon: "fa fa-user",
          text: "Profile",
        },
      ];
  return (
    <div>
        <Sidebar sideItem={StaffSidebarData} head={"Staff"} srtIcon={srtIcon} />
    </div>
  )
}

export default StaffNavbar