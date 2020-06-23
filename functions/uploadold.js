require("dotenv").config();

const {
  getAccessTokenFromHeaders,
  validateAccessToken,
} = require("./utils/auth");
const cloudinary = require("cloudinary");
const faunadb = require("faunadb");
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.handler = async (event, context, callback) => {
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

  const dimageUrl = await res1.secure_url;
  const mimageUrl = await res2.secure_url;

  const merchItem = {
    data: {
      dimageUrl,
      mimageUrl,
      saleType,
    },
  };

  return client
    .query(q.Create(q.Ref("classes/merch"), merchItem))
    .then((response) => {
      console.log("success", response);
      /* Success! return the response with statusCode 200 */
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(response),
      });
    })
    .catch((error) => {
      console.log("error", error);
      /* Error! return the error with statusCode 400 */
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error),
      });
    });
};
