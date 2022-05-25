const express = require("express");
const compression = require("compression");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const app = express();

let mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
};

if(process.env.NODE_ENV === "production"){
    mongooseOptions.auth = {authSource: "admin"};
    mongooseOptions.user = "website";
    mongooseOptions.pass = process.env.MONGODB_PASS;
}

mongoose.connect("mongodb://127.0.0.1/leemorgan", mongooseOptions);

app.use(compression());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(fileUpload({limits: { fileSize: 1024 * 1024}}));
require("./routes.js")(app);

if(process.env.NODE_ENV === "production"){
    module.exports = app;
}else{
    app.listen(process.env.PORT);
}