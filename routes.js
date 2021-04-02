module.exports = function(app){
    let views = `${__dirname}/views`;
    //MAIN
    app.get("/", (req, res)=>{res.sendFile(`${views}/main/index.html`)});
    app.get("/style", (req, res)=>{res.sendFile(`${views}/main/index.css`)});

    //WRITING
    app.get("/writing/style", (req, res)=>{res.sendFile(`${views}/writing/index.css`)});
    app.get("/writing/touchscreens", (req, res)=>{res.sendFile(`${views}/writing/touchscreens.html`)});

    //IMAGES
    app.get("/images/touchscreen", (req, res)=>{res.sendFile(`${views}/images/touchscreen.jpeg`)});
    app.get("/images/subline", (req, res)=>{res.sendFile(`${views}/images/subline.png`)});
    app.get("/images/budgeteer", (req, res)=>{res.sendFile(`${views}/images/budgeteer.jpeg`)});
}