const writing = require("./controllers/writing.js");
const travel = require("./controllers/travel.js");
const learn = require("./controllers/learn.js");

module.exports = function(app){
    let views = `${__dirname}/views`;

    //MAIN
    app.get("/", (req, res)=>{res.sendFile(`${views}/main/index.html`)});
    app.get("/style", (req, res)=>{res.sendFile(`${views}/main/index.css`)});

    //WRITING
    app.get("/writing/style", (req, res)=>{res.sendFile(`${views}/writing/index.css`)});
    app.get("/writing/code", (req, res)=>{res.sendFile(`${views}/writing/index.js`)});
    app.get("/writing/comments/:article", writing.getComments);
    app.post("/writing/comments", writing.createComment);
    app.get("/writing/directories", writing.listDirectories);

    //IMAGES
    app.get("/images/subline", (req, res)=>{res.sendFile(`${views}/images/subline.png`)});
    app.get("/images/budgeteer", (req, res)=>{res.sendFile(`${views}/images/budgeteer.jpeg`)});
    app.get("/images/sudoku", (req, res)=>{res.sendFile(`${views}/images/sudoku.png`)});
    app.get("/images/birthday", (req, res)=>{res.sendFile(`${views}/images/birthday.jpg`)});
    app.get("/images/market", (req, res)=>{res.sendFile(`${views}/images/market.jpeg`)});
    app.get("/images/web", (req, res)=>{res.sendFile(`${views}/images/webIcon.jpg`)});
    app.get("/images/html5", (req, res)=>{res.sendFile(`${views}/images/html5.png`)});

    //SUDOKU
    app.get("/sudoku", (req, res)=>{res.sendFile(`${views}/sudoku/index.html`)});
    app.get("/sudoku/style", (req, res)=>{res.sendFile(`${views}/sudoku/index.css`)});
    app.get("/sudoku/code", (req, res)=>{res.sendFile(`${views}/sudoku/index.js`)});

    //BIRTHDAY PARADOX
    app.get("/birthdayparadox", (req, res)=>{res.sendFile(`${views}/birthdayParadox/index.html`)});
    app.get("/birthdayparadox/style", (req, res)=>{res.sendFile(`${views}/birthdayParadox/index.css`)});
    app.get("/birthdayparadox/code", (req, res)=>{res.sendFile(`${views}/birthdayParadox/index.js`)});

    //TRAVEL
    app.get("/travel/style", (req, res)=>{res.sendFile(`${views}/travel/index.css`)});
    app.get("/travel/directories", travel.listDirectories);
    app.get("/travel/images/*", travel.getImages);
    app.get("/travel/*", (req, res)=>res.sendFile(`${views}/travel/index.html`));

    //LEARN
    app.get("/learn/style", (req, res)=>{res.sendFile(`${views}/learn/index.css`)});
    app.get("/learn/course/new", (req, res)=>{res.sendFile(`${views}/learn/newCourse.html`)});
    app.post("/learn/course/new", learn.createCourse);
    app.get("/learn/lecture/new", (req, res)=>{res.sendFile(`${views}/learn/newLecture.html`)});
    app.post("/learn/lecture/new", (learn.createLecture));
    app.get("/learn/courses", learn.getCourses);
    app.get("/learn", (req, res)=>{res.sendFile(`${views}/learn/courses.html`)});

    //CONTENT
    app.get("/thumbNails/*", (req, res)=>{res.sendFile(`${__dirname}${req.url}`)});
    app.get("/documents/*", (req, res)=>{res.sendFile(`${__dirname}${req.url}`)});
}