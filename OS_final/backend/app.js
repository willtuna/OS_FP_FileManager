/**
 * Created by user on 2017/12/8.
 */
var express = require('express');
var bodyParser = require('body-parser');
var api = require('./api/api')


var app = express();

app.use(express.static('public'));

app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( bodyParser.json() );


app.use(async(req,res, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${req.method}  - ${ms}ms`);
});
app.get('/', function (req, res) {
    res.sendFile('index.html');
});
app.use(api)







app.listen(3001, function () {
    console.log('Example app listening on port 3001!');
})
