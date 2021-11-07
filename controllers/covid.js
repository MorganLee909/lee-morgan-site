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
            }},
            {$sort: {date: 1}},
            {$project: {
                location: 1,
                date: 1,
                total_cases: 1,
                new_cases: 1,
                total_deaths: 1,
                new_deaths: 1
            }}
        ])
            .then((covids)=>{
                return res.json(covids);
            })
            .catch((err)=>{
                console.error(err);
            });
    },
}