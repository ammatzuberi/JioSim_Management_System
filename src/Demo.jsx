// import React, { useEffect, useState } from "react";

// import { MDBDataTable } from "mdbreact";

// import "./App.css";
// import { SearchTable } from "./Component/Pages/Table/Search/Search";
// import axios from "axios";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import ExpandLessIcon from "@mui/icons-material/ExpandLess";
// import { Link } from "react-router-dom";

// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import EditIcon from "@mui/icons-material/Edit";
// import Swal from "sweetalert2/dist/sweetalert2.js";
// import "sweetalert2/src/sweetalert2.scss";
// import AddIcon from "@mui/icons-material/Add";
// import { Grid } from "@mui/material";

// export default function Demo() {
//   const [simData, setSimData] = useState([]);
//   const [accordionOpenStates, setAccordionOpenStates] = useState({});

//   const getSimData = async () => {
//     const url = "http://localhost:8085/ene/sim/All/";

//     try {
//       const response = await axios.get(url, { withCredentials: "include" });
//       setSimData(response.data);
//     } catch (error) {
//       console.log("Error While Fetching Data", error);
//     }
//   };
//   useEffect(() => {
//     getSimData();
//   }, []);

//   const handleSearch = async () => {
//     // setCurrentPage(1);
//     console.log(searchTerm);
//     console.log(searchVal);

//     const searchResult = await axios.get(
//       `http://localhost:8085/ene/sim/${searchTerm}/${searchVal}`
//     );
//     console.log(searchResult.data);
//     let data = [];
//     data.push(searchResult.data);

//     setSimData(searchResult.data);
//     setIsOpen(isOpen);
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const handleSearchDropDown = (e) => {
//     setSearchTerm(e.target.value);
//     console.log(e.target.value);
//   };
//   const HandleSearchVal = (e) => {
//     // setSearchTerm(e.target.value);
//     setSearchValue(e.target.value);
//   };
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchVal, setSearchValue] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [entriesPerPage, setEntriesPerPage] = useState(5);

//   const filteredData = simData.filter((item) =>
//     item.company.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const startIndex = (currentPage - 1) * entriesPerPage;
//   const endIndex = startIndex + entriesPerPage;
//   const paginatedData = filteredData.slice(startIndex, endIndex);

//   const totalPages = Math.ceil(filteredData.length / entriesPerPage);

//   const toggleAccordion = (companyId) => {
//     setAccordionOpenStates((prevState) => ({
//       ...prevState,
//       [companyId]: !prevState[companyId],
//     }));
//   };
//   function Accordion({ company }) {
//     const companyId = company.companyId;
//     const isOpen = accordionOpenStates[companyId];
//     console.log(company);

//     const handleDelete = async (id) => {
//       Swal.fire({
//         title: "Are you sure?",
//         text: "You won't be able to revert this!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, delete it!",
//       }).then((result) => {
//         if (result.isConfirmed) {
//           const url = `http://localhost:8085/ene/sim/remove/${id}`;
//           axios
//             .delete(url)
//             .then((response) => {
//               console.log("Delete successful", response.data);
//               console.log(response.data);
//             })
//             .catch((error) => {
//               console.log("error", error);
//             });

//           Swal.fire("Deleted!", "Your file has been deleted.", "success").then(
//             () => {
//               const updateddata = simData.map((item) => ({
//                 ...item,
//                 allSims: item.allSims.filter((sim) => sim.idsim !== id),
//               }));
//               setSimData(updateddata);
//             }
//           );
//         }
//       });
//     };
//     return (
//       <div
//         className="accordion"
//         style={{
//           boxShadow: "0 2px 5px 1px rgba(64,60,67,.16)",
//           border: "none",
//           borderRadius: "24px",
//           backgroundColor: "#fff",
//         }}
//       >
//         <button
//           onClick={() => toggleAccordion(companyId)}
//           style={{
//             borderRadius: "5rem",
//             border: "none",

//             fontWeight: "normal",
//             color: "#000",

//             textTransform: "capitalize",
//             letterSpacing: "0",
//             backgroundColor: "#fff",
//           }}
//         >
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               position: "relative",
//             }}
//           >
//             {company.allSims.length === 0 ? "" : ""}
//             <span>{company.company}</span>
//             <Link
//               to={"/AddSim/" + company.companyId}
//               style={{
//                 textDecoration: "none",
//                 color: "blue",
//                 position: "absolute",
//                 marginRight: "5rem",
//                 right: 0,
//                 backgroundColor: "#f3f4f6",
//                 color: "#fff",
//                 borderRadius: "50px",
//                 width: "6.5rem",
//                 textAlign: "center",
//                 color: "#000",
//                 fontSize: "1rem",
//               }}
//             >
//               <span>
//                 <AddIcon /> Add Sim
//               </span>
//             </Link>
//             ;
//             <span
//               style={{
//                 position: "absolute",
//                 right: 0,
//                 marginRight: "2rem",
//                 backgroundColor: "#4338ca",
//                 borderRadius: "1rem",
//                 width: "1.5rem",
//                 textAlign: "center",
//                 color: "white",
//               }}
//             >
//               {company.allSims.length}
//             </span>
//             {isOpen ? (
//               <span>
//                 <ExpandMoreIcon />
//               </span>
//             ) : (
//               <span>
//                 <ExpandLessIcon />
//               </span>
//             )}
//           </div>
//         </button>
//         {isOpen && (
//           <div className="accordion-content">
//             <table style={{ width: "100%" }}>
//               <thead>
//                 <tr
//                   style={{
//                     backgroundColor: "#f8fafc",
//                     color: "#97a2b2",
//                     fontWeight: 800,
//                   }}
//                 >
//                   <th>Client Name</th>
//                   <th>ICCID</th>
//                   <th>IMSI</th>
//                   <th>Connection Type</th>
//                   <th>Location</th>

//                   <th>Edit</th>
//                   <th>Delete</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {company.allSims.map((sim, index) => (
//                   <tr key={index} style={{ backgroundColor: "#fff" }}>
//                     <td>{sim.clientName}</td>
//                     <td style={{ fontSize: ".8rem" }}>{sim.ICCID}</td>
//                     <td style={{ fontSize: ".8rem" }}>{sim.IMSI}</td>
//                     <td style={{ fontSize: ".8rem" }}>{sim.connectionType}</td>
//                     <td style={{ fontSize: ".8rem" }}>{sim.location}</td>

//                     <td>
//                       <Link
//                         to={"/Edit/" + sim.idsim}
//                         style={{ color: "#6366f1" }}
//                       >
//                         <EditIcon />
//                       </Link>
//                     </td>
//                     <td>
//                       <button
//                         onClick={() => handleDelete(sim.idsim)}
//                         style={{
//                           border: "none",
//                           backgroundColor: "#fff",
//                           display: "flex",
//                           alignItems: "center, ",
//                           justifyContent: "center",
//                         }}
//                       >
//                         <DeleteForeverIcon
//                           style={{ color: "red", padding: "auto" }}
//                         />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             {company.allSims.length === 0 ? (
//               <p style={{ color: "Red" }}>No sim data found for this company</p>
//             ) : (
//               ""
//             )}
//           </div>
//         )}
//       </div>
//     );
//   }

//   return (
//     <div className="App">
//       <Grid container justifyContent="space-between" marginBottom="1rem">
//         <Grid item sx={{ marginLeft: ".5rem" }}>
//           <select onChange={(e) => setEntriesPerPage(parseInt(e.target.value))}>
//             <option value="10">Show 10 entries</option>
//             <option value="20">Show 20 entries</option>
//             <option value="30">Show 20 entries</option>
//           </select>
//         </Grid>

//         <Grid item sx={{ marginLeft: ".5rem" }}>
//           <select onChange={handleSearchDropDown}>
//             <option value="">--Please Select--</option>
//             <option value="ICCID">ICCID</option>
//             <option value="IMSI">IMSI</option>
//             <option value="companyName">Company Name</option>
//             <option value="clientName">Client Name</option>
//             <option value="connectionType">Connection Type</option>
//             <option value="location">location</option>
//           </select>
//         </Grid>

//         <Grid item sx={{ marginRight: ".5rem" }}>
//           <input
//             type="text"
//             placeholder="Search by company name"
//             value={searchVal}
//             onChange={HandleSearchVal}
//           />
//           <button onClick={handleSearch}>Search</button>
//         </Grid>
//       </Grid>
//       <div>
//         {simData?.map((company, index) => (
//           <Accordion
//             key={index}
//             company={company}
//             companyId={company.companyId}
//           />
//         ))}
//       </div>
//       <div>
//         {Array.from({ length: totalPages }, (_, index) => (
//           <button key={index} onClick={() => handlePageChange(index + 1)}>
//             {index + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Link } from "react-router-dom";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2/dist/sweetalert2.js";

import AddIcon from "@mui/icons-material/Add";
import { Grid } from "@mui/material";

export default function Demo() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [simData, setSimData] = React.useState([]);
  const [accordionOpenStates, setAccordionOpenStates] = React.useState({});

  const getSimData = async () => {
    const url = "https://sim-ostk.onrender.com/ene/sim/all";

    try {
      const response = await axios.get(url, { withCredentials: "include" });
      setSimData(response.data);
    } catch (error) {
      console.log("Error While Fetching Data", error);
    }
  };
  React.useEffect(() => {
    getSimData();
  }, []);
  const handleDelete = async (id) => {
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
            const updateddata = simData.map((item) => ({
              ...item,
              allSims: item.allSims.filter((sim) => sim.idsim !== id),
            }));
            setSimData(updateddata);
          }
        );
      }
    });
  };

  const handleSearch = async () => {
    // setCurrentPage(1);
    console.log(searchTerm);
    console.log(searchVal);

    const searchResult = await axios.get(
      `http://localhost:8085/ene/sim/${searchTerm}/${searchVal}`
    );
    console.log(searchResult.data);
    let data = [];
    data.push(searchResult.data);

    setSimData(searchResult.data);
    setIsOpen(isOpen);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchDropDown = (e) => {
    setSearchTerm(e.target.value);
    console.log(e.target.value);
  };
  const HandleSearchVal = (e) => {
    // setSearchTerm(e.target.value);
    setSearchValue(e.target.value);
  };
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchVal, setSearchValue] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);

  return (
    <>
      <Grid container justifyContent="space-between" sx={{ padding: ".5rem" }}>
        <Grid item>
          <select
            onChange={handleSearchDropDown}
            style={{ width: "10rem", height: "2.5rem" }}
          >
            <option value="">--Please Select--</option>
            <option value="ICCID">ICCID</option>
            <option value="IMSI">IMSI</option>
            <option value="company">Company Name</option>
            <option value="clientName">Client Name</option>
            <option value="connectionType">Connection Type</option>
            <option value="location">location</option>
          </select>
        </Grid>

        <Grid item sx={{ display: "flex", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Search by company name"
            value={searchVal}
            onChange={HandleSearchVal}
            style={{
              padding: "0.5rem",
              borderRadius: "0.25rem",
              border: "1px solid #ccc",
              marginRight: "0.5rem",
              minWidth: "200px",
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              color: "white",
              backgroundColor: "#33a0ff",
              border: "none",
              borderRadius: "0.25rem",
              padding: "0.5rem 1rem",
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </Grid>
      </Grid>

      {simData.map((company, index) => {
        return (
          <div>
            <Accordion
              expanded={expanded === company.companyId}
              onChange={handleChange(company.companyId)}
              sx={{
                border: "1px solid #ddd",
                marginBottom: "10px",
                borderRadius: "5px",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                sx={{
                  backgroundColor: "#f8f8f8",
                  borderBottom: "1px solid #ddd",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  {company.company}
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  <Link
                    to={"/AddSim/" + company.companyId}
                    style={{
                      textDecoration: "none",
                      color: "blue",
                      position: "absolute",
                      marginRight: "5rem",
                      right: 0,

                      color: "#fff",
                      borderRadius: "50px",
                      width: "6.5rem",
                      textAlign: "center",
                      color: "#000",
                      fontSize: "1rem",
                    }}
                  >
                    <span>
                      <AddIcon /> Add Sim
                    </span>
                    <Typography
                      sx={{
                        width: "33%",
                        flexShrink: 0,
                        float: "right",
                        marginRight: "-2rem",
                        backgroundColor: "#33a0ff",
                        borderRadius: "50%",
                        textAlign: "center",
                        color: "white",
                      }}
                    >
                      {company.allSims.length}
                    </Typography>
                  </Link>
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ backgroundColor: "#fafafa" }}>
                <Typography>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr
                        style={{
                          backgroundColor:
                            index % 2 === 0 ? "#ffffff" : "#f5f5f5",
                          textAlign: "center",
                        }}
                      >
                        <th>Client Name</th>
                        <th>ICCID</th>
                        <th>IMSI</th>
                        <th>Connection Type</th>
                        <th>Location</th>

                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {company.allSims.map((sim, index) => (
                        <tr
                          key={index}
                          style={{
                            backgroundColor: "#fff",
                            textAlign: "center",
                          }}
                        >
                          <td>{sim.clientName}</td>
                          <td style={{ fontSize: ".8rem" }}>{sim.ICCID}</td>
                          <td style={{ fontSize: ".8rem" }}>{sim.IMSI}</td>
                          <td style={{ fontSize: ".8rem" }}>
                            {sim.connectionType}
                          </td>
                          <td style={{ fontSize: ".8rem" }}>{sim.location}</td>

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
                                cursor: "pointer",
                                padding: "5px",
                                transition: "background-color 0.3s ease",
                              }}
                            >
                              <DeleteForeverIcon style={{ color: "red" }} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        );
      })}
    </>
  );
}
