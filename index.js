// server.js

const express = require("express");
const sql = require("mssql/msnodesqlv8");
const cors = require("cors");

const app = express();
app.use(cors());
const config = {
  server: "TRUELEAF\\SQLEXPRESS",
  database: "portfolio",
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true,
  },
};

app.get("/api/personal_info", (req, res) => {
  sql.connect(config, function (err) {
    if (err) {
      console.error("Error connecting to SQL Server:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      var request = new sql.Request();
      request.query("select * from personal_info", function (err, records) {
        if (err) {
          console.error("Error executing query:", err);
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          // Set the content type to application/json
          res.setHeader("Content-Type", "application/json");
          // Send the JSON response
          res.send(JSON.stringify(records.recordset));
        }
        sql.close();
      });
    }
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
