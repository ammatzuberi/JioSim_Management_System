import React, { useEffect, useState } from "react";
import "./index.css";
import { MDBDataTable } from "mdbreact";
import "mdbreact/dist/css/mdb.css";
import "./App.css";
import { SearchTable } from "./Component/Pages/Table/Search/Search";
import axios from "axios";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Link } from "react-router-dom";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

export default function Demo() {
  const [simData, setSimData] = useState([]);
  const getSimData = async () => {
    const url = "http://localhost:8085/ene/sim/All/";

    try {
      const response = await axios.get(url, { withCredentials: "include" });

      // const { allSims } = response.data;
      console.log(response.data);

      // setSimData((previous) => [...previous, response.data]);
      setSimData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Error While Fetching Data", error);
    }
  };

  useEffect(() => {
    getSimData();
  }, []);
  function Accordion({ company }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
      setIsOpen(!isOpen);
    };

    const handleDelete = async (id) => {
      console.log(id);
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          const url = `http://localhost:8085/ene/sim/remove/${id}`;
          axios
            .delete(url)
            .then((response) => {
              console.log("Delete successful", response.data);
              console.log(response.data);
            })
            .catch((error) => {
              console.log("error", error);
            });

          Swal.fire("Deleted!", "Your file has been deleted.", "success").then(
            () => {
              // setSimData(simData.filter((p) => p.idsim !== id));
              const updateddata = simData.map((item) => ({
                ...item,
                allSims: item.allSims.filter((sim) => sim.idsim !== id),
              }));

              // navigate("/");
              setSimData(updateddata);
            }
          );
        }
      });
    };
    return (
      <div className="accordion">
        <button
          onClick={handleToggle}
          style={{
            borderRadius: "5rem",

            fontWeight: "normal",
            color: "#000",

            textTransform: "capitalize",
            letterSpacing: "0",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              position: "relative",
            }}
          >
            {/* {console.log(company)} */}

            {company.allSims.length === 0 ? "" : ""}
            <span>{company.company}</span>

            <span
              style={{
                position: "absolute",
                right: 0,
                marginRight: "2rem",
                backgroundColor: "#4338ca",
                borderRadius: "1rem",
                width: "1.5rem",
                textAlign: "center",
                color: "white",
              }}
            >
              {company.allSims.length}
            </span>

            {isOpen ? (
              <span>
                <ExpandMoreIcon />
              </span>
            ) : (
              <span>
                <ExpandLessIcon />
              </span>
            )}
          </div>
        </button>
        {isOpen && (
          <div className="accordion-content">
            <table style={{ width: "100%" }}>
              <thead>
                <tr
                  style={{
                    backgroundColor: "#f8fafc",
                    color: "#97a2b2",
                    fontWeight: 800,
                  }}
                >
                  <th>Client Name</th>
                  <th>ICCID</th>
                  <th>IMSI</th>
                  <th>Connection Type</th>
                  <th>Location</th>
                  <th>Add Sim</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {company.allSims.map((sim, index) => (
                  <tr key={index} style={{ backgroundColor: "#fff" }}>
                    <td>{sim.clientName}</td>
                    <td>{sim.ICCID}</td>
                    <td>{sim.IMSI}</td>
                    <td>{sim.connectionType}</td>
                    <td>{sim.location}</td>
                    <td>
                      <Link
                        to={"/AddSim/" + sim.idsim}
                        style={{ color: "#6366f1" }}
                      >
                        Add
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={"/Edit/" + sim.idsim}
                        style={{ color: "#6366f1" }}
                      >
                        <EditIcon />
                      </Link>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(sim.idsim)}
                        style={{
                          border: "none",
                          backgroundColor: "#fff",
                          display: "flex",
                          alignItems: "center, ",
                          justifyContent: "center",
                        }}
                      >
                        <DeleteForeverIcon
                          style={{ color: "red", padding: "auto" }}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {company.allSims.length === 0 ? (
              <p style={{ color: "Red" }}>No sim data found for this company</p>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    );
  }

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);

  const filteredData = simData.filter((item) =>
    item.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Search by company name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <select
        value={entriesPerPage}
        onChange={(e) => setEntriesPerPage(parseInt(e.target.value))}
      >
        <option value="10">Show 10 entries</option>
        <option value="20">Show 20 entries</option>
        <option value="30">Show 20 entries</option>
      </select>
      <div>
        {paginatedData.map((company, index) => (
          <Accordion key={index} company={company} />
        ))}
      </div>
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
