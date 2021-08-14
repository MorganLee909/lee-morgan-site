const Uploader = require("../models/uploader.js");
const Gallery = require("../models/gallery.js");
const createId = require("./createId.js");

module.exports = {
    /*
    POST: create a new gallery
    req.body = {
        uploader: String (id of owner)
        password: String
        title: String
        tags: [String]
        coordinates: String
    }
    req.files = [images]
    */
    create: function(req, res){
        Uploader.findOne({_id: req.body.uploader})
            .then((uploader)=>{
                if(uploader === null) throw "uploader";
                if(req.body.password !== uploader.password) throw "pass";

                let coords = req.body.coordinates.split(", ")

                let gallery = new Gallery({
                    owner: uploader._id,
                    title: req.body.title,
                    tags: req.body.tags.split(","),
                    location: {
                        type: "Point",
                        coordinates: [parseFloat(coords[0]), parseFloat(coords[1])]
                    },
                    images: []
                });

                let handleImage = (fileData)=>{
                    let fileString = `/galleryImages/${createId(25)}.jpg`;
                    fileData.mv(`${__dirname}/..${fileString}`);
                    gallery.images.push(fileString)
                }

                if(req.files.images.length === undefined) handleImage(req.files.images);
                for(let i = 0; i < req.files.images.length; i++){
                    handleImage(req.files.images[i]);
                };

                return gallery.save();
            })
            .then((gallery)=>{
                return res.redirect(`/gallery/${gallery._id}`);
            })
            .catch((err)=>{
                if(err === "uploader") return res.json("You do not have permission to upload");
                if(err === "pass") return res.json("Incorrect password");
                return res.json("ERROR: something went wrong");
            });
    },

    getGalleries: function(req, res){
        Gallery.find()
            .then((galleries)=>{
                return res.json({galleries: galleries, mapboxKey: process.env.MAPBOX_KEY});
            })
            .catch((err)=>{
                return res.json("ERROR: could not fetch galleries");
            });
    },

    /*
    GET: fetch the data for a single gallery
    req.params.id = String (gallery id)
    response = Gallery
    */
    getGallery: function(req, res){
        Gallery.findOne({_id: req.params.id})
            .then((gallery)=>{
                return res.json(gallery);
            })
            .catch((err)=>{
                return res.json("ERROR: could not fetch gallery");
            });
    },

    /*
    POST: updates a gallery
    req.body = {
        title: String
        tags: String
        location: String
    }
    req.files = {
        images: [Image]
    }
    req.params.id = String (id of gallery)
    */
    updateGallery: function(req, res){
        console.log(req.body);
        console.log(req.files.images);
    }
}