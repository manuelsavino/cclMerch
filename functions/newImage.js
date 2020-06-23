require("dotenv").config();
const mongoose = require("mongoose");
const Image = require("./Models/Image");

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    mongoose.connect(
      `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@${process.env.MONGODB}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    const formData = JSON.parse(event.body);
    const { fileName, path } = formData;

    const newImage = new Image({
      fileName,
      path,
    });

    const imageNew = await newImage.save();

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(imageNew),
    });
  } catch (e) {
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({ msg: "Something went wrong" }),
    });
  }
};
