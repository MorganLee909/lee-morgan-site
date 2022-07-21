const Tracker = require("../models/tracker.js");

module.exports = {
    /*
    POST: create a new tracker
    req.body = {
        name: String
        project: String
        description: String
        start: Date
    }
    */
    create: function(req, res){
        let tracker = new Tracker({
            name: req.body.name,
            project: req.body.project,
            description: req.body.description,
            start: new Date(req.body.start),
            pauses: []
        });

        tracker.save()
            .then((tracker)=>{
                return res.json(tracker);
            })
            .catch((err)=>{
                console.error(err);
                return res.json(err);
            });
    },

    /*
    PUT: update data on a tracker
    req.body = {
        id: String
        name: String
        project: String
        description: String
        end: Date
        pause: {
            start: Date
            end: Date
        }
    }
    */
    update: function(req, res){
        Tracker.findOne({_id: req.body.id})
            .then((tracker)=>{
                if(!tracker) throw "tracker";

                if(req.body.name) tracker.name = req.body.name;
                if(req.body.project) tracker.project = req.body.project;
                if(req.body.description) tracker.description = req.body.description;
                if(req.body.end) tracker.end = new Date(req.body.end);
                if(req.body.pause){
                    tracker.pauses.push({
                        start: new Date(req.body.pause.start),
                        end: new Date(req.body.pause.end)
                    });
                }

                return tracker.save();
            })
            .then((tracker)=>{
                return res.json(tracker);
            })
            .catch((err)=>{
                if(err === "tracker") return res.json("Could not find tracker");
                console.error(err);
                return res.json(err);
            });
    }
}