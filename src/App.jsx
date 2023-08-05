import "./App.css";
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

  useEffect(() => {
    const getSimData = async () => {
      const url = "http://localhost:3000/ene/sim/All/";

      try {
        const response = await axios.get(url);
        const SimData = response.data;
        // console.log(simData);

        // setSimData((initsiate) => [...initsiate, { SimData }]);
        setSimData(SimData);
      } catch (error) {
        console.log("Error While Fetching Data", error);
      }
    };
    getSimData();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Login />} path="/login" />
          <Route element={<SignUp />} path="/signup" />
          <Route element={<ProtectedRoute />}>
            <Route element={<DataTable getSim={simData} />} path="/" />
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
