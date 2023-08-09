import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DataTable from "../Table/DataTable";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import LogoutIcon from "@mui/icons-material/Logout";

import { ThemeProvider } from "@emotion/react";
import {
  Backdrop,
  Container,
  Tab,
  createTheme,
  makeStyles,
} from "@mui/material";
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import classes from "./SideBar.module.css";
import SimCardIcon from "@mui/icons-material/SimCard";

const drawerWidth = 240;

function SideBar(props) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.title}>
        <h1 className={classes.titleName}>Jio Sim</h1>
      </div>
      <Divider />
      <List>
        <NavLink
          onClick={handleDrawerToggle}
          to="/Dashboard"
          className={(navData) =>
            navData.isActive ? classes.active : classes.link
          }
        >
          <ListItem className={classes.listItem} disablePadding>
            <ListItemButton>
              <ListItemIcon></ListItemIcon>
              <DashboardIcon className={classes.icons} />

              <ListItemText>Dasboard</ListItemText>
            </ListItemButton>
          </ListItem>
        </NavLink>
        <NavLink
          onClick={handleDrawerToggle}
          to="/form"
          className={(navData) =>
            navData.isActive ? classes.active : classes.link
          }
        >
          <ListItem disablePadding className={classes.listItem}>
            <ListItemButton>
              <ListItemIcon></ListItemIcon>
              <SimCardIcon className={classes.icons} />

              <ListItemText> Add Sim</ListItemText>
            </ListItemButton>
          </ListItem>
        </NavLink>

        <NavLink
          to="/signup"
          className={(navData) =>
            navData.isActive ? classes.active : classes.link
          }
        >
          <ListItem disablePadding className={classes.listItem}>
            <ListItemButton>
              <ListItemIcon></ListItemIcon>
              <PersonAddAltIcon className={classes.icons} />

              <ListItemText> Create User </ListItemText>
            </ListItemButton>
          </ListItem>
        </NavLink>
        <NavLink
          onClick={handleLogout}
          to="/login"
          className={(navData) =>
            navData.isActive ? classes.active : classes.link
          }
        >
          <ListItem disablePadding className={classes.listItem}>
            <ListItemButton>
              <ListItemIcon></ListItemIcon>
              <LogoutIcon className={classes.icons} /> Logout
              <ListItemText></ListItemText>
            </ListItemButton>
          </ListItem>
        </NavLink>
      </List>
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const theme = createTheme({
    // shadows: ["none"],

    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: "#1c2536",
            color: "#7f8792",
          },
        },
      },
      div: {
        backgroundColor: "#ffff",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar
            sx={{
              display: "flex",

              backgroundColor: "#ffff",
              zIndex: "1190",
              backdropFilter: blur("6px"),
              border: "1px solid #d9d9e3",
              width: "100%",

              fontFamily:
                "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                display: { sm: "none" },
                color: "red",
              }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                color: "black",
                fontSize: {
                  lg: 20,
                  md: 20,
                  sm: 15,
                  xs: 11,
                },
              }}
            >
              IOT SIM
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          {/* <DataTable /> */}
          <Toolbar />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

SideBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default SideBar;
