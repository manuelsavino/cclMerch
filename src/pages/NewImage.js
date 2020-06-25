import React, { useState, useEffect } from "react";
import { useAuth0 } from "../auth";
import { makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Upload() {
  const classes = useStyles();
  const [paths, setPaths] = useState([]);
  const { getTokenSilently } = useAuth0();
  const [formData, setFormData] = useState({
    fileName: "",
    path: "",
  });

  useEffect(() => {
    try {
      async function fetchData() {
        const token = await getTokenSilently();
        const res = await fetch("/.netlify/functions/getPathOptions/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setPaths(data);
      }

      fetchData();
    } catch (err) {
      console.log("err", err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const token = await getTokenSilently();
      const res = await fetch("/.netlify/functions/newImage/", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
        <h1>Submit New Image</h1>
        <form onSubmit={submitHandler}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Path</InputLabel>
            <Select
              name="path"
              value={formData.path}
              onChange={handleChange}
              label="path"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {paths.map((path) => {
                return (
                  <MenuItem key={path._id} value={path.shortname}>
                    {path.shortname}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <TextField
              value={formData.fileName}
              onChange={handleChange}
              name="fileName"
              label="File Name"
              variant="outlined"
            />
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <Button variant="contained" color="primary" type="submit">
              Primary
            </Button>
          </FormControl>
        </form>
      </Box>
    </main>
  );
}
