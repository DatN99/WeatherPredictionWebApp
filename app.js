var express = require("express");
var app = express();
var port = process.env.PORT || 8000;



app.use(express.static("public\\rock-paper-scissor"));

app.get("/", function(req, res) {
    res.send("Hello World");
});

app.listen(port);

