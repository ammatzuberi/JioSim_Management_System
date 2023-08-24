import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./Component/Redux/Store";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <BrowserRouter basename="/">
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter> */}
    <App />
  </React.StrictMode>
);

export default function main() {
  return <div>main</div>;
}
