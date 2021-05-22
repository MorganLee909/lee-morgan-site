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
                        path: newPath.substring(newPath.indexOf("/travel") + 7, newPath.length),
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

    getImages: function(req, res){
        let path = req.originalUrl
            .split("/")
            .slice(2)
            .join("/");

        let pictures = fs.readdirSync(`${__dirname}/content/${path}`);

        let response = [];
        
        for(let i = 0; i < pictures.length; i++){
            response.push(`/${path}/${pictures[i]}`);
        }

        return res.json(response);
    }
}