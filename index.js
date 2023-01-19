var express = require("express");
var app = express();
const commentController = require("./api/controller/commentController");
app.use(express.json());
app.use("/comments", commentController);
app.listen(8008);
