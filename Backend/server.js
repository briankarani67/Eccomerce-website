 const express = require("express");
 const cors = require("cors");

 const app = express();

 const router = require("./routes/getting")

 app.use("/", router)
 app.use(express.json());
 app.use(cors());


 app.listen(3434, () => {
    console.log("Server is running well at  http://localhost:3434");
 });

