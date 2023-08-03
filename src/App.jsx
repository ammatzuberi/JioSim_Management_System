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

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Login />} path="/login" />
          <Route element={<SignUp />} path="/signup" />
          <Route element={<ProtectedRoute />}>
            <Route element={<DataTable />} path="/" />
            <Route element={<Form />} path="/form" />
          </Route>

          {/* <Route element={<Authentication />} path="/login" /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
