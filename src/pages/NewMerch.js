import React, { useState } from "react";
import { useAuth0 } from "../auth";

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
  const { getTokenSilently } = useAuth0();
  const [formData, setFormData] = useState({
    dimage: "",
    mimage: "",
    // date: "",
    saleType: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChage = (e) => {
    const files = [];
    const name = e.target.name;
    Object.keys(e.target.files).map((file) => {
      files.push(e.target.files[file]);
    });
    console.log(files);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData({ ...formData, [name]: reader.result });
      };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const token = await getTokenSilently();
      const res = await fetch("/.netlify/functions/upload/", {
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
        <h1>Upload</h1>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            name="saleType"
            value={formData.saleType}
            onChange={handleInputChange}
            placeholder="Sale Type"
          />
          <input
            type="file"
            name="dimage"
            onChange={handleFileInputChage}
            className="form-input"
          />
          <input
            type="file"
            name="mimage"
            onChange={handleFileInputChage}
            className="form-input"
          />
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
        <div style={{ display: "flex" }}>
          {formData.dimage && (
            <img
              alt="preview of asset being uploaded"
              src={formData.dimage}
              style={{ height: "300px" }}
            />
          )}
          {formData.mimage && (
            <img
              alt="preview of asset being uploaded"
              src={formData.mimage}
              style={{ height: "300px" }}
            />
          )}
        </div>
      </Box>
    </main>
  );
}

export default Dashboard;
