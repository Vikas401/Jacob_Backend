"use strict";
const _ = require("lodash");
const multer = require("multer");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
var { db } = require("./app/config/db.config");
const timeout = require("connect-timeout");
var cookieParser = require("cookie-parser");
const connectLivereload = require("connect-livereload");

const app = express();
const port = process.env.PORT || 3002;
//  app.use(timeout('5s'));
//  app.use(haltOnTimedout);
app.use(cookieParser());
//  app.use(haltOnTimedout);
app.use(connectLivereload());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("welcome")
  // res.sendFile(path.join(__dirname+'/index.html'));
});

require("./app/routes/customersRoutes")(app);
require("./app/routes/sentiScoresRoutes")(app);

// function haltOnTimedout(req, res, next) {
//   if (!req.timedout) next();
// }
const storageEngine = multer.diskStorage ({
  destination: './uploads/',
  filename: function (req, file, callback) {
    callback (
      null,
      file.fieldname + path.extname (file.originalname)
    );
  },
});

const upload = multer ({
  storage: storageEngine,
});

app.post ('/upload', upload.single ('uploadedFile'), (req, res) => {
  res.json (req.file).status (200);
});

app.listen(process.env.PORT || port, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
module.exports = { app };
