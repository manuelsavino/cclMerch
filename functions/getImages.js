require("dotenv").config();
const mongoose = require("mongoose");
const Image = require("./Models/Image");

const {
  getAccessTokenFromHeaders,
  validateAccessToken,
} = require("./utils/auth");

exports.handler = async (event, context, callback) => {
  // context.callbackWaitsForEmptyEventLoop = false;
  // const token = getAccessTokenFromHeaders(event.headers);
  // const user = await validateAccessToken(token);

  // if (!user) {
  //   return {
  //     statusCode: "401",
  //     body: JSON.stringify({ err: "Unathorized" }),
  //   };
  // }

  function closeBD(cbk) {
    console.log("Close BD");
    db.close(function () {
      cbk();
    });
  }

  try {
    mongoose.connect(
      `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@${process.env.MONGODB}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    const { year } = event.queryStringParameters;
    console.log(year);
    const param = year.split(",");
    const images = await Image.find({ path: { $in: param } });

    d;

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(images),
    });
    // mongoose.connection.close();
  } catch (e) {
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({ msg: e }),
    });
    mongoose.connection.close();
  }
};
