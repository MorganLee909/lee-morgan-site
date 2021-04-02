module.exports = function(app){
    //MAIN
    app.get("/", (req, res)=>{res.sendFile(`${__dirname}/views/main/index.html`)});
    app.get("/style", (req, res)=>{res.sendFile(`${__dirname}/views/main/index.css`)});

    //WRITING
    app.get("/writing/style", (req, res)=>{res.sendFile(`${__dirname}/views/writing/index.css`)});
    app.get("/writing/touchscreens", (req, res)=>{res.sendFile(`${__dirname}/views/writing/touchscreens.html`)});

    //IMAGES
    app.get("/images/touchscreen", (req, res)=>{res.sendFile(`${__dirname}/views/images/touchscreen.jpeg`)});
}