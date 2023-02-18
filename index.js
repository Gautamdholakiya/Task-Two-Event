const express = require("express");
const app = express();
const DatabaseConnect = require("./ConnectDb");
const router = require("./Api/UserApi");
const dotenv = require("dotenv");
dotenv.config("./.env");

app.use(express.json());

app.use("/User", router.router);
app.listen(3000, () => {
  console.log(`Listining Successfully`);
});

DatabaseConnect();
