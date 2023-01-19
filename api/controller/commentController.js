const commentModel = require("../model/commentModel");
const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");
var urlEncodedParser = bodyParser.urlencoded({ extended: true });

router.post("/", urlEncodedParser, async (req, res, next) => {
  try {
    let comment = {
      author: req.body.author,
      comment: req.body.comment,
      createdAt: new Date(),
    };
    const result = await commentModel.create("comment", comment);
    if (!result) return res.sendStatus(409);
    return res.status(201).json(result);
  } catch (e) {
    return next(e);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const result = await commentModel.get("comment");
    return res.json(result);
  } catch (e) {
    return next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const result = await commentModel.getById("comment", req.params.id);
    if (!result) return res.sendStatus(404);
    return res.json(result);
  } catch (e) {
    return next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const result = await commentModel.deleteById("comment", req.params.id);
    if (!result) return res.sendStatus(404);
    return res.sendStatus(200);
  } catch (e) {
    return next(e);
  }
});

router.put("/:id", urlEncodedParser, async (req, res, next) => {
  try {
    let comment = {
      author: req.body.author,
      comment: req.body.comment,
      updatedAt: new Date(),
    };
    const updatedResult = await commentModel.update(
      "comment",
      req.params.id,
      comment
    );
    if (!updatedResult) return res.sendStatus(404);
    return res.json(updatedResult);
  } catch (e) {
    return next(e);
  }
});

router.patch("/:id", urlEncodedParser, async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const result = await commentModel.getById("comment", id);
    if (!result) return res.sendStatus(404);

    Object.keys(data).forEach((key) => (result[key] = data[key]));

    const updatedResult = await commentModel.update("comment", id, result);
    return res.json(updatedResult);
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
