import React, { useState } from "react";
import Clipboard from "react-clipboard.js";
import axios from "axios";

export default function ImageGallery({ images, title }) {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [term, setTerm] = useState("");

  useEffect(() => {
    try {
      async function fetchData() {
        const images = await axios.get("/.netlify/functions/getImages/");
        setImages(images.data);
      }

      fetchData();
    } catch (err) {
      console.log("err", err);
    }
  }, []);
}
