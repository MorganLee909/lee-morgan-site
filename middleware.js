module.exports = {
    visit: function(req, res, next){
        new Visitor({
            time: new Date(),
            route: req.baseUrl,
            ip: req.ip,
            method: req.method
        }).save().catch((err)=>{console.error(err)});
        next();
    }
}    