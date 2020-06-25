import React, { useState, useEffect } from "react";

//Material UI
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    background: "#F4F6F8",
    minHeight: "100vh",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    height: "100%",
  },
}));

function Dashboard() {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <Toolbar />
      <Box
        width="auto"
        bgcolor="#FFF"
        style={{
          borderRadius: "5px",
          padding: "20px",
          margin: "10px",
        }}
      >
        <h1>hello</h1>
      </Box>
    </main>
  );
}

export default Dashboard;
