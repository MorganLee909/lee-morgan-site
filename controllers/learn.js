const Uploader = require("../models/uploader.js");
const Course = require("../models/course.js");
const {Lecture, Question, Answer} = require("../models/lecture.js");

const createId = require("./createId.js");

const axios = require("axios");
const queryString = require("querystring");

module.exports = {
    /*
    POST: create a new course
    req.body = {
        uploaderId: String,
        password: String,
        title: String
        thumbNail: String,
        description: String
    }
    redirect to home
    */
    createCourse: function(req, res){
        Uploader.findOne({_id: req.body.uploaderId})
            .then((uploader)=>{
                if(uploader === null) throw "uploader";
                if(req.body.password !== uploader.password) throw "pass";
                let imgString = `/thumbNails/${req.files.thumbNail.name}`;
                req.files.thumbNail.mv(`${__dirname}/..${imgString}`);

                let course = new Course({
                    owner: uploader._id,
                    title: req.body.title,
                    thumbNail: imgString,
                    description: req.body.description
                });

                return course.save();
            })
            .then((course)=>{
                return res.redirect("/");
            })
            .catch((err)=>{
                if(err === "uploader") return res.json("Uploader doesn't exist");
                if(err === "pass") return res.json("Incorrect password");
                return res.json("Something went wrong on the backend");
            });
    },

    /*
    POST: create a new lecture
    req.body = {
        uploader: String
        password: String
        course: String
        title: String
        video: String
        description: String
        furtherReading: [{
            text: String
            link: String
        }]
        exercises: [String]
        documents: [{
            title: String
            link: String
        }],
        date: Date
    }
    redirects to edited lecture
    */
    createLecture: function(req, res){
        Course.findOne({_id: req.body.course})
            .populate("owner")
            .then((course)=>{
                if(course === null) throw "noCourse";
                if(req.body.uploader !== course.owner._id.toString()) throw "badOwner";
                if(req.body.password !== course.owner.password) throw "badPass";


                let exercises = req.body.exercises.split("\r\n");
                exercises.splice(exercises.length - 1, 1);

                let furtherReading = req.body.furtherReading.split("\r\n");
                furtherReading.splice(furtherReading.length-1, 1);
                let readings = [];
                for(let i = 0; i < furtherReading.length; i+=2){
                    readings.push({
                        text: furtherReading[i],
                        link: furtherReading[i+1]
                    });
                }

                let lecture = new Lecture({
                    course: course._id,
                    title: req.body.title,
                    video: req.body.video,
                    description: req.body.description,
                    furtherReading: readings,
                    exercises: exercises,
                    documents: [],
                    createdDate: new Date(req.body.date)
                });

                
                if(req.files !== null){
                    let files = req.files.documents;
                    if(files.length === undefined){
                        let fileId = createId(25);
                        let fileParts = files.name.split(".");
                        let fileString = `/documents/${fileId}.${fileParts[1]}`;
                        files.mv(`${__dirname}/..${fileString}`);
                        lecture.documents.push({
                            name: files.name,
                            link: fileString
                        })
                    }else{
                        for(let i = 0; i < files.length; i++){
                            let fileId = createId(25);
                            let fileParts = files[i].name.split(".");
                            let fileString = `/documents/${fileId}.${fileParts[1]}`;
                            files[i].mv(`${__dirname}/..${fileString}`);
                            lecture.documents.push({
                                name: files[i].name,
                                link: fileString
                            });
                        }
                    }
                }
                
                return lecture.save();
            })
            .then((lecture)=>{
                return res.redirect(`/learn/lectures/${lecture._id}`);
            })
            .catch((err)=>{
                if(err === "noCourse") return res.json("Course does not exist");
                if(err === "badOwner") return res.json("You do not own this course");
                if(err === "badPass") return res.json("Incorrect password");
                return res.redirect("/");
            });
    },

    /*
    POST: updates a lecture
    req.body = {
        uploader: String,
        password: String
        title: String
        video: String
        description: String
        furtherReading: String (\r\n delimited)
        exercises; String (\r\n delimited)
        date: Date
    }
    req.params.id = String (lecture id)
    redirects to updated lecture
    */
    updateLecture: function(req, res){
        Lecture.findOne({_id: req.params.id})
            .then((lecture)=>{
                if(lecture === null) throw "notFound";

                let furtherReading = req.body.furtherReading.split("\r\n");
                furtherReading.splice(furtherReading.length - 1, 1);
                let readings = [];
                for(let i = 0; i < furtherReading.length; i+=2){
                    readings.push({
                        text: furtherReading[i],
                        link: furtherReading[i+1]
                    });
                }

                let exercises = req.body.exercises.split("\r\n");
                exercises.splice(exercises.length - 1, 1);

                lecture.title = req.body.title;
                lecture.video = req.body.video;
                lecture.description = req.body.description;
                lecture.furtherReading = readings;
                lecture.exercises = exercises;
                lecture.updatedDate = new Date(req.body.date);

                return lecture.save();
            })
            .then((lecture)=>{
                return res.redirect(`/learn/lectures/${lecture._id}`);
            })
            .catch((err)=>{
                return res.redirect(`/learn/lectures/edit/${lecture._id}`);
            });
    },

    /*
    DELETE: remove the lecture
    req.params.id = lecture to remove
    redirects to home
    */
    removeLecture: function(req, res){
        Lecture.deleteOne({_id: req.params.id})
            .then((lecture)=>{
                return res.redirect("/");
            })
            .catch((err)=>{
                return res.redirect(`/learn/lectures/edit/${req.params.id}`);
            })
    },

    getCourses: function(req, res){
        Course.find()
            .then((courses)=>{
                return res.json(courses);
            })
            .catch((err)=>{
                return res.json("Could not retrieve courses");
            });
    },

    /*
    GET: get a list of lectures from a course
    req.params.id = String (course id)
    response = {
        course: Course,
        lectures: [Lecture]
    }
    */
    getLectures: function(req, res){
        let course = Course.findOne({_id: req.params.id});
        let lectures = Lecture.find({course: req.params.id});

        Promise.all([course, lectures])
            .then((response)=>{
                return res.json({course: response[0], lectures: response[1]});
            })
            .catch((err)=>{
                return res.json("Could not retrieve lectures");
            });
    },

    /*
    GET: get data for a single lecture
    req.params.id = String (lecture id)
    response = Lecture
    */
    getLecture: function(req, res){
        Lecture.findOne({_id: req.params.id})
            .populate("course")
            .then((lecture)=>{
                return res.json(lecture);
            })
            .catch((err)=>{
                return res.json("Could not retrieve lecture");
            });
    },

    /*
    POST: create a new question
    req.body = {
        lecture: String (Lecture id)
        name: String
        title: String
        content: String
    }
    response: Question
    */
    createQuestion: function(req, res){
        console.log(req.body);
        let question = new Question({
            name: req.body.name,
            title: req.body.title,
            content: req.body.content,
            answers: []
        });

        Lecture.findOne({_id: req.body.lecture})
            .then((lecture)=>{
                lecture.questions.push(question);

                axios({
                    method: "post",
                    url: "https://api.mailgun.net/v3/mg.leemorgan.io/messages",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    auth: {
                        username: "api",
                        password: process.env.MG_PERSONAL_APIKEY
                    },
                    data: queryString.stringify({
                        from: "Lee Morgan <learn@leemorgan.io>",
                        to: "me@leemorgan.io",
                        subject: question.title,
                        text: question.content
                    })
                })
                .catch((err)=>{
                    console.error(err);
                });

                lecture.save();
            })
            .then((lecture)=>{

                return res.json(question);
            })
            .catch((err)=>{
                console.error(err);
                return res.json("ERROR: unable to save the question");
            });
    }
}