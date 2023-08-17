import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, useNavigate, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Form() {
  const [selectedValue, setSelectedValue] = React.useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    console.log(event.target.value.toString());
  };
  const [errorFound, setErrorFound] = React.useState("");
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log(data);

    // const url = "http://localhost:8085/ene/sim/create";
    const url = "https://sim-ostk.onrender.com/ene/sim/create";
    axios
      .post(url, {
        companyName: data.get("Company Name"),
        ICCID: data.get("ICCID"),
        IMSI: data.get("IMSI"),

        location: data.get("location"),
        connectionType: selectedValue,
        clientName: data.get("clientName"),
      })
      .then((response) => {
        if (response.statusText == "Created") {
          navigate("/");
        } else {
        }
      })
      .catch((error) => {
        const { response } = error;
        const { data } = response;

        console.log("error", data);

        Swal.fire({
          icon: "error",
          title: data.msg || data.message,
        });
      });
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "-40px",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <AddCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add New Sim
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="Company Name"
                  required
                  fullWidth
                  id="CompanyName"
                  label="Company Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="clientName"
                  name="clientName"
                  required
                  fullWidth
                  id="clientName"
                  label="Client Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="ICCID"
                  label="ICCID"
                  name="ICCID"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="IMSI"
                  label="IMSI"
                  name="IMSI"
                  autoComplete="IMSI"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Vendor</InputLabel>

                  <Select
                    fullWidth
                    value={selectedValue}
                    label="Vendor"
                    onChange={handleChange}

                    // onChange={handleChange}
                  >
                    <MenuItem value="Airtel">Airtel</MenuItem>
                    <MenuItem value="Jio">Jio</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="location"
                  label="location"
                  type="location"
                  id="location"
                  autoComplete="location"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
