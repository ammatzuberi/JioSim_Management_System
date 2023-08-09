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

const defaultTheme = createTheme();

export default function EditForm(props) {
  const [simData, setSimData] = React.useState("");

  const { id } = useParams();
  const [editData, setEditData] = React.useState({
    id: id,
    companyName: "",
    clientName: "",
    IMSI: "",
    ICCID: "",
    location: "",
    connectionType: "",
  });
  React.useEffect(() => {
    const getSimData = async () => {
      const url = "http://localhost:8085/ene/sim/All/";

      try {
        const response = await axios.get(url);
        const SimData = response.data;

        const { sim } = SimData;

        setSimData(sim);
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
    const filterSimData = await simData?.filter((data) => {
      return data.idsim == params.id;
    });
    console.log(filterSimData);
    filterSimData.map((data) => {
      console.log(data);
      setEditData({
        ...editData,
        simid: id,
        companyName: data.companyName,
        clientName: data.clientName,
        IMSI: data.IMSI,
        ICCID: data.ICCID,
        location: data.location,
        connectionType: data.connectionType,
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

      location: data.get("location"),
      connectionType: data.get("connectionType"),
      clientName: data.get("clientName"),
    });

    const url = `http://localhost:8085/ene/sim/update/${id}`;
    axios
      .patch(url, {
        companyName: data.get("Company Name"),
        ICCID: data.get("ICCID"),
        IMSI: data.get("IMSI"),

        location: data.get("location"),
        connectionType: data.get("connectionType"),
        clientName: data.get("clientName"),
      })
      .then((response) => {
        navigate("/Dashboard");

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
          <Typography component="h1" variant="h5">
            Edit Sim Record
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
                  id="clientName"
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
                <TextField
                  required
                  fullWidth
                  name="connectionType"
                  label="connectionType"
                  type="connectionType"
                  id="connectionType"
                  autoComplete="connectionType"
                  value={editData.connectionType}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      connectionType: e.target.value,
                    })
                  }
                />
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
