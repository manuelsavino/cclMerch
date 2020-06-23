const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
let isConnected;
require("dotenv").config();

module.exports = connectToDatabase = connectDB = () => {
  if (isConnected) {
    console.log("=> using existing database connection");
    return Promise.resolve();
  }
  try {
    return mongoose
      .connect(
        `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@${process.env.MONGODB}`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      )
      .then((db) => {
        isConnected = db.connections[0].readyState;
      });
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
  }
};

module.exports = connectDB;
