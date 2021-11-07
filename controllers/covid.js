const Covid = require("../models/covid.js");

module.exports = {
    /*
    POST: get data based on country and date
    req.body = {
        from: Date
        to: Date
        isoCode: String
    }
    response = [Covid]
    */
    data: function(req, res){
        let from = new Date(req.body.from);
        let to = new Date(req.body.to);

        Covid.aggregate([
            {$match: {
                iso_code: req.body.isoCode,
                date: {$gte: from, $lte: to},
            }}
        ])
            .then((covids)=>{
                return res.json(covids);
            })
            .catch((err)=>{
                console.error(err);
            });
    }
}