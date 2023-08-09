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
import DataTable from "./Component/Pages/Table/DataTable";
import { useEffect, useState } from "react";
import axios from "axios";
import EditForm from "./Component/Pages/Form/EditForm";
import { SimCardIcon } from "@mui/icons-material/SimCard";

function App() {
  const [simData, setSimData] = useState([]);
  const [tokenval, setTokenVal] = useState("");
  const getSimData = async () => {
    const url = "http://localhost:8085/ene/sim/All/";

    try {
      const response = await axios.get(url);

      setSimData(response.data);
    } catch (error) {
      console.log("Error While Fetching Data", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    setTokenVal(token);
    getSimData();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            // element={!tokenval ? <Login /> : <Navigate to="/Dashboard" />}
            element={<Login />}
            path="/login"
          />
          {/* <Route element={tokenval ? <SignUp /> : <Navigate to=''/> />} path="/signup" /> */}
          <Route element={<ProtectedRoute token={tokenval} />}>
            <Route element={<DataTable />} path="/Dashboard" />
            <Route element={<Form />} path="/form" />
            <Route element={<EditForm getSim={simData} />} path="/Edit/:id/" />
          </Route>
          <Route
            element={tokenval ? <SignUp /> : <Login />}
            path="/signup"
            exact
          />

          {/* <Route element={<Authentication />} path="/login" /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
