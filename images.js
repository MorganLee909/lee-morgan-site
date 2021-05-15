const fs = require("fs");

module.exports = {
    listDirectories: function(req, res){
        const searchDir = function(path, currentObject){
            let response = fs.readdirSync(path);

            for(let i = 0; i < response.length; i++){
                if(response[i].includes(".") === false){
                    let newPath = `${path}/${response[i]}`;
                    let newObject = ({
                        name: response[i].replace(/-/g, " "),
                        path: newPath.substring(newPath.indexOf("/images") + 7, newPath.length),
                        contents: []
                    });

                    currentObject.contents.push(newObject);
                    searchDir(newPath, newObject);
                }
            }

            return currentObject;
        }

        let result = searchDir(`${__dirname}/content`, {
            contents: []
        });

        return res.json(result.contents[0].contents);
    },

    imagesHtml: function(){
        
    }
}