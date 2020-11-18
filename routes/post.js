const express = require('express');
const multer = require('multer');
const path = require('path');

const { Post, User } = require('../models');
const { isLoggedIn } = require('./middlewares');
const { Router } = require('express');

const router = express.Router();

const upload = multer();
router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      writer: req.user.nick,
    });
    res.redirect('/');
  } catch(error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;