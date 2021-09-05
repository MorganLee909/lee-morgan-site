const Visitor = require("./models/visitor.js");

module.exports = {
    visit: function(req, res, next){
        new Visitor({
            time: new Date(),
            route: req.path,
            ip: req.ip,
            method: req.method
        }).save().catch((err)=>{console.error(err)});
        next();
    }
}    