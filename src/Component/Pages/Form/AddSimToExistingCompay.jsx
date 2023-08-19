import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, parsePath, useNavigate, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import axios from "axios";

const defaultTheme = createTheme();

export default function AddSimToExistingCompany(props) {
  const [simData, setSimData] = React.useState("");

  const { id } = useParams();
  const [editData, setEditData] = React.useState({
    // id: id,
    companyName: "",
    clientName: "",
    IMSI: "",
    ICCID: "",
    location: "",
    connectionType: "",
  });
  React.useEffect(() => {
    const getSimData = async () => {
      // const url = "http://localhost:8085/ene/sim/All/";
      // const url = "https://sim-ostk.onrender.com/ene/sim/all";
      const url = "https://app.enggenv.com/ene/sim/all";

      try {
        const response = await axios.get(url);
        const SimResponse = response.data;

        console.log(SimResponse);

        setSimData(SimResponse);
        console.log(simData);
      } catch (error) {
        console.log("Error While Fetching Data", error);
      }
    };
    getSimData();
  }, []);
  React.useEffect(() => {
    gettingData();
  }, [simData]);

  const params = useParams();

  const gettingData = async () => {
    await simData?.map((company) => {
      console.log(company);
      if (company.companyId == id) {
        setEditData({
          ...editData,
          companyName: company.company,
        });
      }
    });
  };

  const navigate = useNavigate();

  // Handle Submit For Changing the data edit
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      companyName: data.get("Company Name"),
      ICCID: data.get("ICCID"),
      IMSI: data.get("IMSI"),

      location: data.get("location"),
      connectionType: editData.connectionType,
      clientName: data.get("clientName"),
    });

    // const url = "http://localhost:8085/ene/sim/create";
    // const url = "https://sim-ostk.onrender.com/ene/sim/create";
    const url = "https://app.enggenv.com/ene/sim/create";
    axios
      .post(
        url,
        {
          companyName: data.get("Company Name"),
          ICCID: data.get("ICCID"),
          IMSI: data.get("IMSI"),

          location: data.get("location"),
          connectionType: editData.connectionType,
          clientName: data.get("clientName"),
        },
        {
          withCredentials: "includes",
          connectionType: "application/json",
        }
      )
      .then((response) => {
        navigate("/");

        console.log(response);
        if (response.status == "OK") {
        }
      })
      .catch((err) => {
        "Error Occured" + err;
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {/* <TextField label="My TextField" value={value} onChange={handleChange} /> */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <AddCircleIcon />
          </Avatar>
          <Typography
            maxWidth="xs"
            component="h1"
            variant="h5"
            sx={{ marginBottom: "1rem", maxWidth: "100%" }}
          >
            Add SIM for{" "}
            <span style={{ color: "#1565c0", fontWeight: 700 }}>
              {editData.companyName}
            </span>
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  InputProps={{
                    readOnly: true,
                  }}
                  autoComplete="given-name"
                  name="Company Name"
                  required
                  fullWidth
                  id="CompanyName"
                  label="Company Name"
                  value={editData.companyName}
                  autoFocus
                  onChange={(e) =>
                    setEditData({ ...editData, companyName: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="clientName"
                  name="clientName"
                  required
                  fullWidth
                  id="Client Name"
                  label="clientName"
                  value={editData.clientName}
                  onChange={(e) =>
                    setEditData({ ...editData, clientName: e.target.value })
                  }
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
                  value={editData.ICCID}
                  onChange={(e) =>
                    setEditData({ ...editData, ICCID: e.target.value })
                  }
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
                  value={editData.IMSI}
                  onChange={(e) =>
                    setEditData({ ...editData, IMSI: e.target.value })
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Vendor</InputLabel>

                  <Select
                    placeholder="Vendor"
                    name="vendor"
                    id="vendor"
                    fullWidth
                    label="IMSI"
                    value={editData.connectionType}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        connectionType: e.target.value,
                      })
                    }

                    // onChange={handleChange}
                  >
                    <MenuItem value="Airtel">Airtel</MenuItem>
                    <MenuItem value="Jio">Jio</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {/* 
              <Grid item xs={12} sm={6}>
                <Select
                  placeholder="Vendor"
                  name="vendor"
                  id="vendor"
                  fullWidth
                  label="IMSI"
                  value={editData.connectionType}
                  onChange={(e) =>
                    setEditData({ ...editData, connectionType: e.target.value })
                  }
                  inputProps={{
                    name: "vendor",
                    id: "vendor-select",
                  }}
                  // onChange={handleChange}
                >
                  <MenuItem value="Airtel">Airtel</MenuItem>
                  <MenuItem value="Jio">Jio</MenuItem>
                </Select>
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="location"
                  label="Location"
                  type="location"
                  id="location"
                  autoComplete="location"
                  value={editData.location}
                  onChange={(e) =>
                    setEditData({ ...editData, location: e.target.value })
                  }
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
