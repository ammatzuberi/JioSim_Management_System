import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { SearchTable } from "./Search/Search";
import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import classes from "./DataTable.module.css";
import AddIcon from "@mui/icons-material/Add";
import { MDBDataTable } from "mdbreact";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

export default function DataTable(props) {
  const { sim } = props.getSim;
  console.log(sim);

  var columns = [
    {
      label: "companyName",
      field: "companyName",
      sort: "asc",
    },
    {
      label: "clientName",
      field: "clientName",
      sort: "asc",
    },

    {
      label: "ICCID",
      field: "ICCID",
      sort: "asc",
    },
    {
      label: "IMSI",
      field: "IMSI",
      sort: "asc",
    },
    {
      label: "location",
      field: "location",
      sort: "asc",
    },

    {
      label: "Edit",
      field: "Edit",
    },
    {
      label: "Delete",
      field: "Delete",
    },
  ];
  // console.log(sim);

  // console.log(proRef.current.map((item)=>));

  React.useEffect(() => {}, [props]);
  const handleDelete = (id) => {
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
        const url = `http://localhost:3000/ene/sim/remove/${id}`;
        axios
          .delete(url)
          .then((response) => {
            console.log("Delete successful", response.data);
          })
          .catch((error) => {
            console.log("error", error);
          });

        Swal.fire("Deleted!", "Your file has been deleted.", "success").then(
          () => {
            window.location.reload();
          }
        );
      }
    });
  };
  var rows =
    sim?.map((row) => ({
      clientName: row?.clientName,
      companyName: row?.companyName,

      IMSI: row?.IMSI,
      ICCID: row?.ICCID,
      location: row?.location,
      Edit: (
        <Link to={"/Edit/" + row.idsim} style={{ color: "#6366f1" }}>
          <EditIcon />
        </Link>
      ),
      Delete: (
        <button
          onClick={() => handleDelete(row.idsim)}
          style={{ border: "none" }}
        >
          <DeleteForeverIcon style={{ color: "red" }} />
        </button>
      ),
    })) || [];
  const tableData = {
    columns,
    rows,
  };

  return (
    <>
      <Grid container justifyContent="space-between" marginBottom="1rem">
        <Grid item>
          <Typography
            sx={{
              color: "#111927",
            }}
          >
            Sim Dashboard
          </Typography>
        </Grid>
        <Grid item>
          <Link to="/form">
            <button className={classes.button}>
              <AddIcon />
              Add
            </button>
          </Link>
        </Grid>
      </Grid>

      {/* <SearchTable /> */}
      <div style={{ height: 400, width: "100%" }}>
        {/* <DataGrid
          getRowId={(row) => row.idsim}
          columns={columns}
          editMode="row"
          rows={rows}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 15, 20]}
          // checkboxSelection
        /> */}
        <MDBDataTable data={tableData} noBottomColumns sortable />
      </div>
    </>
  );
}
