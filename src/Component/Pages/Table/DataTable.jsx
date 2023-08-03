import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { SearchTable } from "./Search/Search";
import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import classes from "./DataTable.module.css";
import AddIcon from "@mui/icons-material/Add";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  ,
  {
    filed: "Edit",
    width: 160,
    headerName: "Edit",
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: "Ammat", age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  // {
  //   Edit: (
  //     <Link to={"/Production/"}>
  //       {" "}
  //       edit
  //       {/* <TbEdit style={{ color: "green" }} /> */}
  //     </Link>
  //   ),
  // },
];

export default function DataTable() {
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

      <SearchTable />
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          // checkboxSelection
        />
      </div>
    </>
  );
}
