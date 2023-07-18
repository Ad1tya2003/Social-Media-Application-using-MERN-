const app = require("./app");
const { connectDatabase } = require("./config/database");
const cloudinary = require("cloudinary");

connectDatabase();
//server
cloudinary.config({
  cloud_name: process.env.CLOUDNARY_NAME,
  api_key: process.env.CLOUDNARY_KEY,
  api_secret: process.env.CLOUDNARY_SECRET_KEY,
});

app.listen(process.env.PORT, () => {
  console.log(`server is working at port ${process.env.PORT}`);
});
