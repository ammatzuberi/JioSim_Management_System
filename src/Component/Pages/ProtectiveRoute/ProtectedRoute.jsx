import React, { useEffect } from "react";
import SideBar from "../NavBar/SIdeBar";
import { Navigate, Outlet } from "react-router-dom";
import classes from "./ProtectedRoute.module.css";
import DataTable from "../Table/DataTable";
import { Box, Toolbar } from "@mui/material";

export default function ProtectedRoute(props) {
  const drawerWidth = 240;

  const token = localStorage.getItem("token");
  return token ? (
    <>
      <SideBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: "auto",
          p: 3,
          // height: "100vh",
          // width: "100%",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Outlet />
        {/* <DataTable /> */}
        {/* <Toolbar /> */}
      </Box>
    </>
  ) : (
    <Navigate to="/login" />
  );
}
