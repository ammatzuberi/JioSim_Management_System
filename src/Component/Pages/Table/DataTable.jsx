import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { SearchTable } from "./Search/Search";
import { Accordion, Button, Grid, Typography, Card } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import classes from "./DataTable.module.css";
import AddIcon from "@mui/icons-material/Add";
import { MDBDataTable } from "mdbreact";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import Demo from "../../../Demo";

export default function DataTable(props) {
  const [simData, setSimData] = React.useState([]);

  const [expandedRow, setExpandedRow] = React.useState(null);

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

  const toggleAccordion = (index) => {
    setExpandedRow(index === expandedRow ? null : index);
    console.log(index);
  };

  React.useEffect(() => {
    getSimData();
  }, []);
  console.log(simData);

  React.useEffect(() => {}, [props]);

  const rows = simData.map((row, index) => ({
    companyName: row.company,
  }));

  //   simData?.flatMap((row, index) => ({
  //     companyName: (
  //       <>
  //         <tr>
  //           <td colSpan={10} onClick={() => toggleAccordion(index)}>
  //             <Grid
  //               container
  //               justifyContent="space-between"
  //               marginBottom="1rem"
  //             >
  //               <Grid item>{row.company}</Grid>
  //               <Grid>
  //                 <p style={{ color: "blue" }}>{row.allSims.length}</p>
  //               </Grid>
  //             </Grid>
  //           </td>
  //         </tr>
  //         {expandedRow === index && (
  //           <div className="accordion-content">
  //             <ul>
  //               {row.allSims.map((sim, simIndex) => (
  //                 <li key={simIndex}>
  //                   {sim.ICCID}
  //                   <br />
  //                   <strong>IMSI:</strong> {sim.IMSI}
  //                   <br />
  //                   <strong>Client Name:</strong> {sim.clientName}
  //                   <br />
  //                   <strong>Connection Type:</strong> {sim.connectionType}
  //                   <br />
  //                   <strong>Location:</strong> {sim.location}
  //                   <br />
  //                   <strong>Company Name:</strong> {sim.companyName}
  //                   <br />
  //                   <strong>Company ID:</strong> {sim.companyId}
  //                   <br />
  //                 </li>
  //               ))}
  //             </ul>
  //           </div>
  //         )}
  //         Edit: (
  //         <Link to={"/Edit/" + row.idsim} style={{ color: "#6366f1" }}>
  //           <EditIcon />
  //         </Link>
  //         ), Delete: (
  //         <button
  //           onClick={() => handleDelete(row.idsim)}
  //           style={{ border: "none" }}
  //         >
  //           <DeleteForeverIcon style={{ color: "red" }} />
  //         </button>
  //       </>
  //     ),
  //   })) || [];

  return (
    <>
      <Grid container justifyContent="space-between" marginBottom="1rem">
        <Grid item>
          <Typography
            sx={{
              color: "#111927",
              fontWeight: 800,
              fontSize: 30,
              fontFamily: " Plus Jakarta Sans sans-serif",
              marginLeft: ".5rem",
            }}
          >
            Sim Dashboard
          </Typography>
        </Grid>
        <Grid item>
          <Link to="/form">
            <button
              style={{
                color: "white",
                backgroundColor: "#3b71ca",
                border: "none",
                borderRadius: "0.25rem",
                padding: "0.5rem 1rem",
                cursor: "pointer",
              }}
            >
              <AddIcon />
              Add New Company
            </button>
          </Link>
        </Grid>
      </Grid>

      {/* <SearchTable /> */}

      <Grid item sx={{ backgroundColor: "f3f3f9", padding: "2rem" }}>
        <div className={classes.tableContainer}>
          <Demo />
        </div>
      </Grid>
    </>
  );
}
