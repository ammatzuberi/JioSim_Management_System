import "./App.css";
import * as React from "react";

import Form from "./Component/Pages/Form/Form";
import Login from "./Component/Pages/Login";
import SideBar from "./Component/Pages/NavBar/SIdeBar";
import ProtectedRoute from "./Component/Pages/ProtectiveRoute/ProtectedRoute";
import SignUp from "./Component/Pages/Signup";
import {
  BrowserRouter,
  HashRouter,
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
import NotProtectedRoutes from "./Component/Pages/ProtectiveRoute/NotProtectedRoutes";

function App() {
  const [simData, setSimData] = useState([]);

  const getSimData = async () => {
    // const url = "http://localhost:8085/ene/sim/All/";
    const url = "https://app.enggenv.com/ene/sim/all";

    try {
      const response = await axios.get(url, {
        withCredentials: true,
      });

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
      <HashRouter>
        <Routes>
          <Route element={<NotProtectedRoutes />}>
            <Route element={<Login />} path="/login" />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<DataTable />} path="/" />
            <Route element={<Form />} path="/form" />
            <Route element={<AddSimToExistingCompany />} path="/AddSim/:id" />
            <Route element={<EditForm getSim={simData} />} path="/Edit/:id/" />
            <Route element={<SignUp />} path="/signup" />
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
