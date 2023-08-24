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
import axios from "axios";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const defaultTheme = createTheme();

export default function EditForm(props) {
  const [simData, setSimData] = React.useState("");

  const { id } = useParams();
  const { _id } = useParams();
  console.log(id);

  const [editData, setEditData] = React.useState({
    id: "",
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
      const url = "https://app.enggenv.com/ene/sim/all";

      try {
        const response = await axios.get(url);
        const SimResponse = response.data;

        setSimData(SimResponse);
      } catch (error) {
        console.log("Error While Fetching Data", error);
      }
    };
    getSimData();
  }, []);
  React.useEffect(() => {
    gettingData();
  }, [simData]);

  console.log(id);
  const gettingData = async () => {
    await simData?.map((company) => {
      company?.allSims?.map((item) => {
        console.log(item);
        if (item.idSIM == id) {
          return setEditData({
            ...editData,
            idSIM: id,
            companyName: item.companyName,
            clientName: item.clientName,
            IMSI: item.IMSI,
            ICCID: item.ICCID,
            location: item.location,
            connectionType: item.connectionType,
          });
        }
      });
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

      location: data.get("Location"),
      connectionType: editData.connectionType,
      clientName: data.get("clientName"),
    });

    // const url = `http://localhost:8085/ene/sim/update/${id}`;
    // const url = `https://sim-ostk.onrender.com/ene/sim/update/${id}`;

    const url = `https://app.enggenv.com/ene/sim/update/${id}`;
    axios
      .patch(
        url,

        {
          companyName: data.get("Company Name"),
          ICCID: data.get("ICCID"),
          IMSI: data.get("IMSI"),

          location: data.get("Location"),
          connectionType: editData.connectionType,
          clientName: data.get("clientName"),
        },
        {
          withCredentials: "include",
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
          <Typography component="h1" variant="h5" sx={{ marginBottom: "1rem" }}>
            Edit SIM Record For {editData.companyName}
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
                    value={editData.connectionType}
                    label="Vendor"
                    fullWidth
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        connectionType: e.target.value,
                      })
                    }
                  >
                    <MenuItem value="Airtel">Airtel</MenuItem>
                    <MenuItem value="Jio">Jio</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* <Grid item xs={12} sm={6}>
                <Select
                  value={editData.connectionType}
                  label="Vendor"
                  fullWidth
                  onChange={(e) =>
                    setEditData({ ...editData, connectionType: e.target.value })
                  }
                >
                  <MenuItem value="Airtel">Airtel</MenuItem>
                  <MenuItem value="Jio">Jio</MenuItem>
                </Select>
              </Grid> */}

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Location"
                  label="Location"
                  type="Location"
                  id="Location"
                  autoComplete="Location"
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
