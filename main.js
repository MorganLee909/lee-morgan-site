const fs = require("fs");

module.exports = {
    main: function(req, res){
        let top = fs.readdirSync("./content");
        console.log(top);

        res.sendFile(`${__dirname}/views/main/index.html`);
    }
}