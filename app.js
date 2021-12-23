var express = require("express");
var app = express();
var port = process.env.PORT || 8000;



app.use(express.static("public\\rock-paper-scissor\\index.html"));

app.get("/", function(req, res) {
    res.send("Hello Worldddd");
});

app.listen(port);

