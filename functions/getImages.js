require("dotenv").config();
const mongoose = require("mongoose");
const Image = require("./Models/Image");

const {
  getAccessTokenFromHeaders,
  validateAccessToken,
} = require("./utils/auth");

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
  try {
    mongoose.connect(
      `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@${process.env.MONGODB}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  } catch (e) {
    console.log(e);
  }
};
