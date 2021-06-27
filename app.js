const htmlCreator = require("./htmlCreator.js");

const express = require("express");
const compression = require("compression");
const mongoose = require("mongoose");
const https = require("https");
const fs = require("fs");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const app = express();
htmlCreator(app);

let mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
};

let httpsServer = {};
if(process.env.NODE_ENV === "production"){
    httpsServer = https.createServer({
        key: fs.readFileSync("/etc/letsencrypt/live/leemorgan.io/privkey.pem", "utf8"),
        cert: fs.readFileSync("/etc/letsencrypt/live/leemorgan.io/fullchain.pem", "utf8")
    }, app);

    app.use((req, res, next)=>{
        if(req.secure === true){
            next();
        }else{
            res.redirect(`https://${req.headers.host}${req.url}`);
        }
    });

    mongooseOptions.auth = {authSource: "admin"};
    mongooseOptions.user = "website";
    mongooseOptions.pass = process.env.MONGODB_PASS;
}

mongoose.connect("mongodb://127.0.0.1/leemorgan", mongooseOptions);

app.use(express.static(__dirname + "/content"));
app.use(compression());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(fileUpload({limits: { fileSize: 1024 * 1024}}));
require("./routes.js")(app);

if(process.env.NODE_ENV === "production") httpsServer.listen(process.env.HTTPS_PORT);
app.listen(process.env.PORT);