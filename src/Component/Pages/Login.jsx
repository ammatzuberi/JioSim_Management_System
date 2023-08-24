import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SignUp from "./Signup";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https:/www.enggenv.com/">
        Engineering and Environmental Solutions
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    // const url = "http://localhost:8085/ene/sim/auth/login/";
    // const url = "https://sim-ostk.onrender.com/ene/sim/auth/login/";
    // const url = "https://sim-with-mongodb.onrender.com/ene/sim/auth/login/";
    const url = "https://app.enggenv.com/ene/sim/auth/login/";

    const header = {
      headers: {
        withCredentials: "include",
        "Content-Type": "application/json",
      },
    };
    const loginData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    // fetch("http://localhost:8085/ene/sim/auth/login", {
    //   method: "POST",

    //   headers: {
    //     "content-Type": "application/json",
    //   },
    //   credentials: "include",
    //   body: JSON.stringify({
    //     email: data.get("email"),
    //     password: data.get("password"),
    //   }),
    // });

    try {
      const response = await axios
        .post(url, loginData, {
          withCredentials: "include",
        })
        .then((response) => {
          // console.log(response.data.token);
          console.log(response);
          localStorage.setItem("token", response.data.token);
          const { email, role, userName } = response.data.user;
          localStorage.setItem("userResponse", email, role, userName);
          // if(response)
        });
      navigate("/");
    } catch (error) {
      // console.log(error.response.data);
      const { msg } = error.response.data;
      Swal.fire({
        icon: "error",
        title: msg,
      });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}
                </Grid>
                {/* <Link to="/signup" variant="body2">
                  Create New Account
                </Link> */}
                <Grid item></Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
