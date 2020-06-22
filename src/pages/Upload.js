import React, { useState } from "react";
import { Input } from "antd";
import { Button } from "antd";
import { useAuth0 } from "../auth";

export default function Upload() {
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
    <div>
      <h1>Upload</h1>
      <form onSubmit={submitHandler}>
        <Input
          type="text"
          name="saleType"
          value={formData.saleType}
          onChange={handleInputChange}
          placeholder="Sale Type"
        />
        <Input
          type="file"
          name="dimage"
          onChange={handleFileInputChage}
          className="form-input"
        />
        <Input
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
    </div>
  );
}
