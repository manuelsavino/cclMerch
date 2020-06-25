import React from "react";
import { Link } from "react-router-dom";

//Material UI
import { indigo } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";

import { withStyles } from "@material-ui/core/styles";

import DashboardIcon from "@material-ui/icons/Dashboard";
import HistoryIcon from "@material-ui/icons/History";
import ImageIcon from "@material-ui/icons/Image";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import AddToQueueIcon from "@material-ui/icons/AddToQueue";
import Avatar from "@material-ui/core/Avatar";
import Logo from "../media/logo.png";

import { Typography } from "@material-ui/core";
import { useAuth0 } from "../auth";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  userArea: {
    display: "flex",
    justifyContent: "center",
    padding: "10px",
    flexDirection: "column",
    alignItems: "center",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: indigo[500],
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  userName: {
    fontWeight: 600,
    marginTop: "10px",
  },
  avatar: {
    backgroundColor: indigo[500],
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginTop: theme.spacing(1),
  },
  logo: {
    flexGrow: 1,
  },
}));

const StyledListItem = withStyles({
  root: {
    backgroundColor: "white",
    "&$selected": {
      backgroundColor: "white",
      color: indigo[500],
    },
  },
  selected: {},
})(ListItem);

function Nav() {
  const classes = useStyles();
  const { user, logout } = useAuth0();
  const NavItems = [
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: <DashboardIcon />,
    },
    {
      name: "Past Merch",
      link: "/pastMerch",
      icon: <HistoryIcon />,
    },
    {
      name: "Media Assets",
      link: "/media",
      icon: <ImageIcon />,
    },
  ];

  const SecondaryNav = [
    {
      name: "New Media Asset",
      link: "/newImage",
      icon: <AddPhotoAlternateIcon />,
    },
    {
      name: "New Past Merch",
      link: "/new",
      icon: <AddToQueueIcon />,
    },
  ];

  return (
    <>
      <AppBar color="primary" position="fixed" className={classes.appBar}>
        <Toolbar>
          <div className={classes.logo}>
            <img alt="studio butler logo" src={Logo} />
          </div>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <div className={classes.userArea}>
            {user.picture ? (
              <Avatar className={classes.avatar} src={user.picture} />
            ) : (
              <Avatar className={classes.avatar}>{`${user[
                "https:cclmerch/username"
              ]
                .split(".")[0][0]
                .toUpperCase()} ${user["https:cclmerch/username"]
                .split(".")[1][0]
                .toUpperCase()}`}</Avatar>
            )}
            <Typography className={classes.userName}>{`${
              user["https:cclmerch/username"]
                .split(".")[0]
                .charAt(0)
                .toUpperCase() +
              user["https:cclmerch/username"].split(".")[0].slice(1)
            } ${
              user["https:cclmerch/username"]
                .split(".")[1]
                .charAt(0)
                .toUpperCase() +
              user["https:cclmerch/username"].split(".")[1].slice(1)
            }`}</Typography>
          </div>
          <Divider />

          <List>
            {NavItems.map((item) => (
              <StyledListItem
                button
                key={item.name}
                component={Link}
                to={item.link}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </StyledListItem>
            ))}
          </List>
          <Divider />
          <List>
            {SecondaryNav.map((item) => (
              <StyledListItem
                button
                key={item.name}
                component={Link}
                to={item.link}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </StyledListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </>
  );
}

export default Nav;
