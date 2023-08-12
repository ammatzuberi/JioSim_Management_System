import "./App.css";
import * as React from "react";

import Form from "./Component/Pages/Form/Form";
import Login from "./Component/Pages/Login";
import SideBar from "./Component/Pages/NavBar/SIdeBar";
import ProtectedRoute from "./Component/Pages/ProtectiveRoute/ProtectedRoute";
import SignUp from "./Component/Pages/Signup";
import {
  BrowserRouter,
  Navigate,
  Route,
  Router,
  RouterProvider,
  Routes,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import DataTable from "./Component/Pages/Table/DataTable";
import { useEffect, useState } from "react";
import axios from "axios";
import EditForm from "./Component/Pages/Form/EditForm";
import { SimCardIcon } from "@mui/icons-material/SimCard";
import CollapsibleTable from "./Demo";
import CollapsableTable from "./Demo";
import AddSimToExistingCompany from "./Component/Pages/Form/AddSimToExistingCompay";

function App() {
  const [simData, setSimData] = useState([]);
  const [tokenval, setTokenVal] = useState("");
  const getSimData = async () => {
    const url = "http://localhost:8085/ene/sim/All/";

    try {
      const response = await axios.get(url, {
        withCredentials: true,
      });

      setSimData(response.data);
    } catch (error) {
      console.log("Error While Fetching Data", error);
    }
  };
  const tokenFunction = () => {
    const token = localStorage.getItem("token");

    setTokenVal(token);
  };

  useEffect(() => {
    getSimData();
    tokenFunction();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<CollapsableTable />} path="/demo" />
          <Route
            element={!tokenval ? <Login /> : <Navigate to="/" />}
            path="/login"
          />

          <Route element={<ProtectedRoute />}>
            <Route element={<DataTable />} path="/" />
            <Route element={<Form />} path="/form" />
            <Route element={<AddSimToExistingCompany />} path="/AddSim/:id" />
            <Route element={<EditForm getSim={simData} />} path="/Edit/:id/" />
            <Route element={tokenval ? <SignUp /> : <Login />} path="/signup" />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
