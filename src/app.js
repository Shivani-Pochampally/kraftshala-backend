const express = require('express');
const userRoutes = require('./modules/user/routes/user.routes');
const meetingRoutes = require('./modules/meeting/routes/meeting.routes');
const errorHandler = require('./middlewares/errorHandler');
const cors = require("cors");


const app = express();
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Calendar Booking API is Live");
});

app.use('/users', userRoutes);
app.use('/meetings', meetingRoutes);

app.use(errorHandler);

module.exports = app;
