import "./App.css";
import * as React from "react";

import Form from "./Component/Pages/Form/Form";
import Login from "./Component/Pages/Login";
import SideBar from "./Component/Pages/NavBar/SIdeBar";
import ProtectedRoute from "./Component/Pages/ProtectiveRoute/ProtectedRoute";
import SignUp from "./Component/Pages/Signup";
import {
  BrowserRouter,
  Route,
  Router,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import DataTable from "./Component/Pages/Table/DataTable";
import { useEffect, useState } from "react";
import axios from "axios";
import EditForm from "./Component/Pages/Form/EditForm";
import { SimCardIcon } from "@mui/icons-material/SimCard";

function App() {
  const [simData, setSimData] = useState([]);
  const getSimData = async () => {
    const url = "http://localhost:5000/ene/sim/All/";

    try {
      const response = await axios.get(url);

      setSimData(response.data);
    } catch (error) {
      console.log("Error While Fetching Data", error);
    }
  };

  useEffect(() => {
    getSimData();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Login />} path="/login" />
          <Route element={<SignUp />} path="/signup" />
          <Route element={<ProtectedRoute />}>
            <Route element={<DataTable />} path="/" />
            <Route element={<Form />} path="/form" />
            <Route element={<EditForm getSim={simData} />} path="/Edit/:id/" />
          </Route>

          {/* <Route element={<Authentication />} path="/login" /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
