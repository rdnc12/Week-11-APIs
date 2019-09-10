//jshint esversion:6

const express = require('express');
const bodyparser = require('body-parser');
const request = require('request');
const fs = require('fs');

const app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static('public'));


app.listen(3000, () => {
    console.log('Server is running...');
});

app.get('/', (req, res) => {
    res.sendfile(__dirname + '/index.html');
});

app.post('/', (req, res) => {

    let searchbox = req.body.searchbox;
    let jsonData = JSON.stringify(searchbox);
    let url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+searchbox;


    request(url, (error, response, body) => {

        if (response.statusCode === 200) {

            let wiki = JSON.parse(body);
            for (var i = 0; i < wiki[1].length; i++) {
                var searchData = wiki[1][i];
                var searchDetails = wiki[2][i].substring(0,71)+"...";
                var searchLink = wiki[3][i];

                res.write(searchData+'\n');
                res.write(searchDetails + '\n');
                res.write(searchLink + '\n\n');
            }
            res.end();  
        }
        else
            res.send('Problem!!!');
    });

});


