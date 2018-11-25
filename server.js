var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");
var stats = [];

if (fs.existsSync("public/stats.json")) {
    var stats = require("./public/stats.json");
}

app.use(express.static("."));
app.use('/socket', express.static(__dirname + '/node_modules/socket.io-client/dist/'));
app.use('/p5', express.static(__dirname + '/node_modules/p5/lib/'));

app.get("/", function (req, res) {
    res.redirect('public/index.html');
});
app.get('/stats', function (req, res) {
    res.redirect('stats.html');
});

server.listen(3000);

io.on("connection", function (socket) {
    socket.on("send stats", function (data) {
        stats.push(data);
        fs.writeFile('public/stats.json', JSON.stringify(stats));
        
    });
    socket.on("get stats", function () {
        fs.readFile('public/stats.json', "utf8", function(err, statisFromFile) {
            socket.emit("send stats", statisFromFile);    
        });
        
    });
});

