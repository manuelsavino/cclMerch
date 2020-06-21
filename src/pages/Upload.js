import React, { useState } from "react";

export default function Upload() {
  const [imageDataUrl, setImageDataUrl] = useState("");

  const handleFileInputChage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageDataUrl(reader.result);
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("submittin");

    try {
      const res = await fetch("/.netlify/functions/upload/", {
        method: "POST",
        body: imageDataUrl,
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Upload</h1>
      {/* {console.log(isAuthenticated)} */}
      <form onSubmit={submitHandler}>
        <input
          type="file"
          name="image"
          onChange={handleFileInputChage}
          className="form-input"
        />
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      {imageDataUrl && (
        <img
          alt="preview of asset being uploaded"
          src={imageDataUrl}
          style={{ height: "300px" }}
        />
      )}
    </div>
  );
}
