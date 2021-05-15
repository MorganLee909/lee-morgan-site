const controller = require("./controller.js");
const travel = require("./travel.js");

module.exports = function(app){
    let views = `${__dirname}/views`;

    //MAIN
    app.get("/", (req, res)=>{res.sendFile(`${views}/main/index.html`)});
    app.get("/style", (req, res)=>{res.sendFile(`${views}/main/index.css`)});

    //WRITING
    app.get("/writing/style", (req, res)=>{res.sendFile(`${views}/writing/index.css`)});
    app.get("/writing/code", (req, res)=>{res.sendFile(`${views}/writing/index.js`)});
    app.get("/writing/comments/:article", controller.getComments);
    app.post("/writing/comments", controller.createComment);
    app.get("/writing/touchscreens", (req, res)=>{res.sendFile(`${views}/writing/touchscreens.html`)});

    //IMAGES
    app.get("/images/touchscreen", (req, res)=>{res.sendFile(`${views}/images/touchscreen.jpeg`)});
    app.get("/images/subline", (req, res)=>{res.sendFile(`${views}/images/subline.png`)});
    app.get("/images/budgeteer", (req, res)=>{res.sendFile(`${views}/images/budgeteer.jpeg`)});
    app.get("/images/sudoku", (req, res)=>{res.sendFile(`${views}/images/sudoku.png`)});
    app.get("/images/birthday", (req, res)=>{res.sendFile(`${views}/images/birthday.jpg`)});
    app.get("/images/market", (req, res)=>{res.sendFile(`${views}/images/market.jpeg`)});

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
}