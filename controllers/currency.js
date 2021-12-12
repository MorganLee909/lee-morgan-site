const Currency = require("../models/currency.js");

module.exports = {
    currency: function(req, res){
        Currency.find()
            .then((currencies)=>{
                return res.render("currency/display.ejs");
            })
            .catch((err)=>{
                console.error(err);
                return res.redirect("/");
            });
    }
}