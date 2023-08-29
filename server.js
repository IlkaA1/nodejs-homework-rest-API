const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;

mongoose.set("strictQuery", true);

mongoose
  .connect(uriDb)
  .then(() => {
    app.listen(PORT, function () {
      console.log(
        `Database connection successful. Use our API on port: ${PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(`Server not running. Error message: ${error.message}`);
    process.exit(1);
  });
