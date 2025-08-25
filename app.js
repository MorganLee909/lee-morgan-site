const express = require("express");
const compression = require("compression");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const app = express();

let mongoString = "mongodb://127.0.0.1/leemorgan";
if(process.env.NODE_ENV === "production"){
    mongoString = `mongodb://leemorgan:${process.env.MONGODB_PASS}@localhost:27017/leemorgan?authSource=admin`
}
mongoose.connect(mongoString);

app.use(compression());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(fileUpload({limits: { fileSize: 1024 * 1024}}));
require("./routes.js")(app);

app.listen(8000);
