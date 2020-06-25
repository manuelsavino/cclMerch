import React, { useState, useEffect } from "react";
import { useAuth0 } from "../auth";
import "react-lazy-load-image-component/src/effects/blur.css";

//Material UI
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";

import { LazyLoadImage } from "react-lazy-load-image-component";

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
  media: {
    height: 140,
  },
  card: {
    width: 345,
    marginBottom: 10,
  },
}));

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
    "data-year": "bh2019",
  };
}

function ImageGallery() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paths, setPaths] = useState([]);
  const { getTokenSilently } = useAuth0();

  const fetchImage = async (term) => {
    setImages([]);
    const token = await getTokenSilently();
    const res = await fetch(`.netlify/functions/getImages/?year=${term}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const imagedata = await res.json();
    setImages(imagedata);
  };

  const fetchPaths = async () => {
    const token = await getTokenSilently();
    const res = await fetch("/.netlify/functions/getPathOptions/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const pathdata = await res.json();
    let tempData = {};
    pathdata.forEach((data) => {
      tempData[data.shortname] = {
        path: data.path,
        dimentions: data.dimentions,
      };
    });
    setPaths(tempData);
  };
  useEffect(() => {
    try {
      fetchImage("dh2020,dh2019");
      fetchPaths();
    } catch (err) {
      console.log("err", err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event, newValue) => {
    console.log(event.target);
    setValue(newValue);
  };

  return (
    <main className={classes.content}>
      <Toolbar />

      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab
            onClick={() => {
              fetchImage("dh2020,dh2019");
            }}
            name="test"
            label="Desktop Heros"
            {...a11yProps(0)}
          />
          <Tab
            onClick={() => {
              fetchImage("mh2020,mh2019");
            }}
            label="Mobile Heros"
            {...a11yProps(1)}
          />
          <Tab label="Desktop B-Tiles" {...a11yProps(2)} />
          <Tab label="Mobile B-Tiles" {...a11yProps(3)} />
          <Tab label="Mobile Sticky" {...a11yProps(4)} />
          <Tab label="Desktop C-Tile" {...a11yProps(5)} />
          <Tab label="Search Banners" {...a11yProps(6)} />
          <Tab label="Cruise Deals Banners" {...a11yProps(7)} />
        </Tabs>
      </AppBar>
      <Box
        width="auto"
        bgcolor="#FFF"
        style={{
          borderRadius: "5px",
          padding: "20px",
          margin: "10px",
        }}
      >
        {/* <div> */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {Object.keys(paths).length > 0 && images.length > 0 ? (
            images.map((image) => {
              return (
                // <Card key={image._id} className={classes.card}>
                //   <CardActionArea>
                //     <CardMedia>
                <LazyLoadImage
                  className={classes.media}
                  effect="blur"
                  src={`https://www.carnival.com${paths[image.path].path}${
                    image.fileName
                  }.ashx?useCustomFunctions=1&${paths[image.path].dimentions}`}
                />
                //     </CardMedia>
                //     <CardContent>
                //       <Typography gutterBottom variant="h5" component="h2">
                //         {image.fileName}
                //       </Typography>
                //     </CardContent>
                //   </CardActionArea>
                //   <CardActions>
                //     <Button size="small" color="primary">
                //       COPY PATH
                //     </Button>
                //     <Button size="small" color="primary">
                //       VIEW
                //     </Button>
                //   </CardActions>
                // </Card>
              );
            })
          ) : (
            <h2>Loading...</h2>
          )}
        </div>
      </Box>
    </main>
  );
}

export default ImageGallery;
