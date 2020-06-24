require("dotenv").config();
const mongoose = require("mongoose");
const Merch = require("./Models/Merch");

const {
  getAccessTokenFromHeaders,
  validateAccessToken,
} = require("./utils/auth");
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const token = getAccessTokenFromHeaders(event.headers);
  const user = await validateAccessToken(token);

  if (!user) {
    return {
      statusCode: "401",
      body: JSON.stringify({ err: "Unathorized" }),
    };
  }
  const formData = JSON.parse(event.body);

  const { saleType } = formData;

  const res1 = await cloudinary.uploader.upload(formData.dimage, {
    upload_preset: "dev_setup",
  });
  const res2 = await cloudinary.uploader.upload(formData.mimage, {
    upload_preset: "dev_setup",
  });

  const desktopImage = await res1.secure_url;
  const mobileImage = await res2.secure_url;

  mongoose.connect(
    `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@${process.env.MONGODB}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  const newMerch = new Merch({
    desktopImage,
    mobileImage,
    saleType,
  });
  const merchNew = await newMerch.save();

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(merchNew),
  });
};
