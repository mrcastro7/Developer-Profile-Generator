const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const electron = require("electron");
const convertFactory= require('electron-html-to');



inquirer
    .prompt([
        {
        type: "input",
        name: "username",
        message: "Enter your GitHub username:"
        },
        {
        type: "input",
        name: "color",
        message: "What is your favorite color?"
        }
])
.then(function( answer ) {
    const queryUrl = `https://api.github.com/users/${answer.username}`;

    axios.get(queryUrl).then(function(res) {
        console.log(res.data.location);
        var location = res.data.location;
        var mapsPlace = location.split(' ').join('+');
        var html = 
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <title>Github Profile Generator</title>
            <link rel="stylesheet" href="style.css">
            <style>
            
        body{
            background-color: lightgray;
            font: 1.5em sans-serif;
        }

        .container{
            margin: 15px;
        
        }

        .header{
            height: 33%;
            /* display: flex; */
            /* align-items: center; */
            /* justify-content: center; */
        }

        .picHeader{
            text-align: center;
        }

        .githubPic{
            height: 200px;
            border-radius: 50%;
        }

        .details{
            width: 50%;
            display:flex;
            margin: auto;
            align-items: center;
            text-align: center;
        }

        .split{
            margin-right: 20px;
            border: 1px black solid;
        }

        .float{
            width: 40%;
            display: flex;
            align-items: center ;
            margin: auto;
        }

        p{
            text-align: center;
        }

        .border{
            border: 1px black solid;
            margin-right: 20px;
        }

        .footer{
            height: 150px;
            margin-top: 25px;
        }   
            </style>
        </head>
        <body>
            <div class= 'container' >
                    <div class = "header" style="background-color: ${answer.color};">
                    <div class = "picHeader" ><img class="githubPic" src="${res.data.avatar_url}" alt="Github Profile Picture"><img></div>
                        <p> Hi! </p>
                        <P>My Name is Marvin Castro!</P>
                        <p>Currently @ George Washington University</p>
                        <div class = details>
                            <p class ="split">location: <a href="https://www.google.com/maps/place/${mapsPlace}">${res.data.location}</a></p>
                            <p class ="split"><a href="${res.data.html_url}">Link to Profile</a></p>
                            <p class ="split">blog</p>
                        </div>
                    </div>
                <div class = 'followers'>
                    <p><i>${res.data.bio}</i></p>
                    <div class = "float" >
                        <div class="border" style="background-color: ${answer.color};">
                            <p>Public Repositories</p>
                            <p>${res.data.public_repos}</p>
                        </div>
                        <div class="border" style="background-color: ${answer.color};">
                            <p>Followers</p>
                            <p>${res.data.followers}</p>
                        </div>
                    </div>
                    <div class = "float">
                        <div class="border" style="background-color: ${answer.color};">
                            <p>Github Stars</p>
                            <p>10</p>
                        </div>
                        <div class="border" style="background-color: ${answer.color};">
                            <p>Following</p>
                            <p>${res.data.following}</p>
                        </div>
                    </div>
                    <div>
                        
                    </div>
                </div>
                <div class= 'footer' style="background-color: ${answer.color};">
                </div>

            </div>
        </body>
        </html>`;

        fs.writeFile("index2.html", html, function(err) {
            if (err) {throw err;}
        });

        // not working 

        // fs.readFile('index2.html', 'utf8', (err, htmlString) => {
        //     // add local path in case your HTML has relative paths
        //     // htmlString = htmlString.replace(/href="|src="/g, match => {
        //     //   return match + 'file://path/to/you/base/public/directory';
        //     // });
        //     const conversion = convertFactory({
        //       converterPath: convertFactory.converters.PDF,
        //       allowLocalFilesAccess: true
        //     });
        //     conversion({ html: htmlString }, (err, result) => {
        //       if (err) return console.error(err);
        //       result.stream.pipe(fs.createWriteStream('pdftest.pdf'));
        //       conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
        //     });
        //   });

    });
});