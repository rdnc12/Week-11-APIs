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

app.post('/', (req, res)=>{

    let searchbox=req.body.searchbox;
    let jsonData = JSON.stringify(searchbox);
    let options = {
        url: 'https://en.wikipedia.org/w/api.php',
        method: 'GET',
        body: jsonData
    };

    request(options,(error,response,body)=>{

        if (response.statusCode === 200)
            res.send('success');
        else
            res.send('Problem!!!')
    });

});


