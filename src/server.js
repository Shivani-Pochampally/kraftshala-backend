const express = require("express");
const app = express();

const db = require("./models");

app.use(express.json());

// connect DB
db.sequelize.sync()
  .then(() => {
    console.log("Database synced");
  })
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
