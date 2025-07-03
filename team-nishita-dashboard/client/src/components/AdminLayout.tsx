import React from "react";
import AdminSidebar from "./AdminSidebar";
import Navbar from "./Navbar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Navbar />
        <div style={{ flex: 1 }}>{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout; 