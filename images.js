const fs = require("fs");

module.exports = {
    list: function(req, res){
        const searchDir = function(path, currentObject){
            let response = fs.readdirSync(path);

            for(let i = 0; i < response.length; i++){
                if(response[i].includes(".") === false){
                    let newObject = ({
                        type: "directory",
                        name: response[i],
                        contents: []
                    });

                    currentObject.contents.push(newObject);
                    searchDir(`${path}/${response[i]}`, newObject);
                }else{
                    currentObject.contents.push({
                        type: "file",
                        route: `${path}/${response[i]}`
                    });
                }
            }

            return currentObject;
        }

        let result = searchDir(`${__dirname}/content`, {
            type: "directory",
            contents: []
        });

        return res.json(result.contents[0].contents);
    }
}