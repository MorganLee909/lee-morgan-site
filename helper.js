module.exports = {
    error: function(message){
        return `
            <div id="bannerContainer">
                <div id="errorBanner">
                    <style>
                        #bannerContainer{
                            display: flex;
                            justify-content: center;
                            width: 100vw;
                        }
                        
                        #errorBanner{
                            position: fixed;
                            top: 10px;
                            background: red;
                            color: white;
                            width: 50%;
                        }
                    </style>
            
                    <h2>${message}</h2>
                </div>
            </div>
        `;
    }
}