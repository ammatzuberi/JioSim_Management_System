import React from "react";
import { Navigate } from "react-router-dom";
import Login from "../Login";

export default function NotProtectedRoutes() {
  const token = localStorage.getItem("token");

  return token ? <Navigate to="/" /> : <Login />;
}
