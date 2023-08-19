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
import SimCardIcon from "@mui/icons-material/SimCard";

export default function Demo() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [simData, setSimData] = React.useState([]);
  const [accordionOpenStates, setAccordionOpenStates] = React.useState({});
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchVal, setSearchValue] = React.useState("");

  const getSimData = async () => {
    // const url = "http://localhost:8085/ene/sim/All";
    // const url = "https://sim-ostk.onrender.com/ene/sim/all";
    const url = "https://app.enggenv.com/ene/sim/all";

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
        // const url = `https://sim-ostk.onrender.com/ene/sim/remove/${id}`;
        // const url = `http://localhost:8085/ene/sim/remove/${id}`;
        const url = `https://app.enggenv.com/ene/sim/remove/${id}`;
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
              allSims: item.allSims.filter((sim) => sim.idSIM !== id),
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

    // const url = `http://localhost:8085/ene/sim/${searchTerm}/${searchVal}`;
    const url = `https://app.enggenv.com/ene/sim/${searchTerm}/${searchVal}`;
    // const url = `https://sim-ostk.onrender.com/ene/sim/${searchTerm}/${searchVal}`;

    const searchResult = await axios.get(url).catch((error) => {
      console.log(error);
      const { data } = error.response;
      console.log(data);
      Swal.fire({
        icon: "error",
        title: data.msg,
      });
    });

    console.log(searchResult.data);

    searchResult.data.map((item) => {
      console.log(item);
      const { length } = item;
      console.log(length);
      if (length == 0) {
        Swal.fire({
          icon: "error",
          title: "No Sim Found",
        });
      }
    });
    let data = [];
    data.push(searchResult.data);

    setSimData(searchResult.data);
    // setIsOpen(isOpen);
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

  const [currentPage, setCurrentPage] = React.useState(1);

  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        sx={{ padding: ".5rem", scrollbarColor: "blue" }}
      >
        <Grid item xs={12} sm={6}>
          <select
            onChange={handleSearchDropDown}
            style={{
              width: "10rem",
              height: "2.5rem",
              textAlign: "center",
              borderColor: "#3b4a64",
            }}
          >
            <option value="">All Category</option>
            <option value="ICCID">ICCID</option>
            <option value="IMSI">IMSI</option>
            <option value="company">Company Name</option>
            <option value="client">Client Name</option>
            {/* <option value="connectionType">Connection Type</option> */}
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
              backgroundColor: "#3b4a64",
              border: "none",
              borderRadius: "0.25rem",
              padding: "0.5rem 1rem",
              cursor: "pointer",
              boxShadow: "rgba(32, 101, 209, 0.24) 0px 8px 16px 0px",
            }}
          >
            Search
          </button>
        </Grid>
      </Grid>

      {simData.map((company, index) => {
        return (
          <Grid
            item
            xs={12}
            sm={6}
            sx={{ overflow: "auto", maxHeight: "200px" }}
          >
            <Accordion
              expanded={expanded === company.companyId}
              onChange={handleChange(company.companyId)}
              sx={{
                marginBottom: "10px",
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      backgroundColor: "#3b4a64",
                      color: "#fff",
                      borderRadius: "50%",
                      boxShadow: "rgba(32, 101, 209, 0.24) 0px 8px 16px 0px",
                    }}
                  />
                }
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                sx={{
                  // backgroundColor: "#f8f9fa",
                  boxShadow: "0 2px 5px 1px rgba(64,60,67,.16)",

                  alignItems: "center",
                  borderRadius: "10%",
                }}
              >
                <Typography
                  sx={{
                    width: "33%",
                    flexShrink: 0,
                    fontSize: "1rem",
                    fontWeight: 700,
                    fontFamily: "courier",
                    color: "#3b4a64",
                  }}
                >
                  {company.company}
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  <Link
                    to={"/AddSim/" + company.companyId}
                    style={{
                      textDecoration: "none",
                      // width: "5%",
                      color: "blue",
                      position: "absolute",
                      right: 0,
                      marginRight: "7rem",

                      borderRadius: "50px",
                      width: "6.5rem",
                      textAlign: "center",

                      fontSize: "1rem",

                      backgroundColor: "#3b4a64",
                      boxShadow: "rgba(32, 101, 209, 0.24) 0px 8px 16px 0px",
                    }}
                  >
                    <AddIcon /> SIM
                    {/* <SimCardIcon /> */}
                  </Link>
                  <Typography
                    sx={{
                      width: "3%",
                      flexShrink: 0,
                      marginRight: "4rem",
                      float: "right",
                      right: "0",
                      position: "absolute",
                      backgroundColor: "#3b4a64",
                      borderRadius: "50%",
                      textAlign: "center",
                      color: "white",
                      boxShadow: "rgba(32, 101, 209, 0.24) 0px 8px 16px 0px",
                    }}
                  >
                    {company.allSims.length}
                  </Typography>
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ backgroundColor: "#fafafa" }}>
                <Typography>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      scrollY: "auto",
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          backgroundColor: "#3b4a64",

                          textAlign: "center",
                          fontFamily: "courier",
                          fontWeight: 900,
                          color: "white",
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
                      {company.allSims.length === 0 ? (
                        <tr>
                          <td colSpan="10" style={{ textAlign: "center" }}>
                            <span
                              style={{
                                color: "red",
                                width: "100%",
                                display: "block",
                                fontWeight: 700,
                                fontSize: "1.2rem",
                              }}
                            >
                              Sorry No SIM Found
                            </span>
                          </td>
                        </tr>
                      ) : (
                        <></>
                      )}
                      {company.allSims.map((sim, index) => (
                        <tr
                          key={index}
                          style={{
                            backgroundColor: "#fff",
                            textAlign: "center",
                            fontFamily: "sans-serif",
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
                              // to={"/Edit/" + sim.idsim}
                              to={"/Edit/" + sim.idSIM}
                              style={{ color: "#6366f1" }}
                            >
                              <EditIcon />
                            </Link>
                          </td>
                          <td>
                            <button
                              // onClick={() => handleDelete(sim.idsim)}
                              onClick={() => handleDelete(sim.idSIM)}
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
          </Grid>
        );
      })}
    </>
  );
}
