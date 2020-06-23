import React from "react";

export default function FeedData() {
  const submitHandler = async (data) => {
    e.preventDefault();
    try {
      const token = await getTokenSilently();
      const res = await fetch("/.netlify/functions/feed/", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return <div></div>;
}
