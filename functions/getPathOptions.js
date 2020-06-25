require("dotenv").config();
const mongoose = require("mongoose");
const Path = require("./Models/Paths");

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

    const Paths = await Path.find({});

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(Paths),
    });
    mongoose.connection.close();
  } catch (e) {
    console.log(e);

    callback(null, {
      statusCode: 500,
      body: JSON.stringify({ msg: e }),
    });
    mongoose.connection.close();
  }
};
