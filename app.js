//jshint esversion:6

const express = require('express');
const bodyparser = require('body-parser');
const request = require('request');

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
    let url = `https://en.wikipedia.org/w/api.php?action=opensearch&search= + ${searchbox}`;


    request(url, (error, response, body) => {

        if (response.statusCode === 200) {
            var wiki = JSON.parse(body);
            for (var i = 0; i < wiki[1].length; i++) {
                var searchData = `You searched for ${wiki[1][i]}`+":";
                var searchDetails=` And these are the  details— ${wiki[2][i]}`;
                var searchLink=`Follow this link to read more — ${wiki[3][i]}`;
                
                 res.write(data);
            }
            res.end();
            //res.redirect(`https://en.wikipedia.org/w/api.php?action=opensearch&search=${searchbox}`);
        }
        else
            res.send('Problem!!!');
    });

});


