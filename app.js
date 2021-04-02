const app = require("express")();
const compression = require("compression");
const https = require("https");
const fs = require("fs");

let httpsServer = {};
if(process.env.NODE_ENV === "production"){
    httpsServer = https.createServer({
        key: fs.readFileSync("/etc/letsencrypt/live/www.leemorgan.io/privkey.pem", "utf8"),
        cert: fs.readFileSync("/etc/letsencrypt/live/www.leemorgan.io/fullchain.pem", "utf8")
    }, app);

    app.use((req, res, next)=>{
        if(req.secure === true){
            next();
        }else{
            res.redirect(`https://${req.headers.host}${req.url}`);
        }
    });
}

app.use(compression());
require("./routes.js")(app);

if(process.env.NODE_ENV === "production") httpsServer.listen(process.env.HTTPS_PORT);
app.listen(process.env.PORT);