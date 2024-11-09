const express = require("express");
const cors = require("cors");
const urlRouter = require("./routes/index");
const { createTables } = require("./utils/create-table");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/", urlRouter);

(async function startServer() {
  try {
    await createTables();
    console.log("Tables created successfully.");

    app.listen(port, () => {
      console.log(`Server connected to port: ${port}`);
    });
  } catch (error) {
    console.error("Error during server startup:", error);
    process.exit(1);
  }
})();