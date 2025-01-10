require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");
const url = process.env.MONGODB_URL;
const port = process.env.PORT || 5000;

//Mongodb connection setup
mongoose
  .connect(url)
  .then(() => console.log("Mongodb atlas connected"))
  .catch((error) => console.log("Error :", error));

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
