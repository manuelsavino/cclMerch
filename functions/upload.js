require("dotenv").config();
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.handler = async (event) => {
  const file = event.body;

  const res = await cloudinary.uploader.upload(file, {
    upload_preset: "dev_setup",
  });

  console.log(res);
  return {
    statusCode: 200,
    body: JSON.stringify(res),
  };
};
