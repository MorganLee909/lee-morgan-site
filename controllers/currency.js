const Currency = require("../models/currency.js");
const Uploader = require("../models/uploader.js");

const createId = require("./createId.js");

module.exports = {
    /*
    POST: create a new currency
    req.body = {
        uploader: String (id of owner)
        password: String
        location: String
        type: String (paper/coin)
        year: Number
        comment: String
        name: String
        value: Number
    }
    req.files = {
        frontImage: Image
        backImage: Image
    }
    redirect: /currency
    */
    create: function(req, res){
        Uploader.findOne({_id: req.body.uploader})
            .then((uploader)=>{
                if(!uploader) throw "uploader";
                if(req.body.password !== uploader.password) throw "pass";

                let createImage = (image)=>{
                    let fileString = `/currencyimages/${createId(25)}.jpg`;
                    image.mv(`${__dirname}/..${fileString}`);
                    return fileString;
                }

                let currency = new Currency({
                    location: req.body.location,
                    name: req.body.name,
                    value: req.body.value,
                    type: req.body.type,
                    year: req.body.year,
                    comment: req.body.comment,
                    frontImage: createImage(req.files.frontImage),
                    backImage: createImage(req.files.backImage)
                });

                return currency.save();
            })
            .then((currency)=>{
                return res.redirect("/");
            })
            .catch((err)=>{
                switch(err){
                    case "uploader": return res.redirect("/");
                    case "pass": return res.redirect("/");
                    default:
                        console.error(err);
                        return res.redirect("/");
                }
            });
    },

    getData: function(req, res){
        Currency.find()
            .then((currencies)=>{
                return res.json(currencies);
            })
            .catch((err)=>{
                console.error(err);
            });
    }
}