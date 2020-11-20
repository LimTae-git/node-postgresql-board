const express = require('express');
const multer = require('multer');
const path = require('path');

const { Post, User } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

/// 게시글 업로드 ///
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

/*
/// 게시글 수정하기 ///
router.post('/:id', async (req, res, next) => {
  let body = req.body;
  let postId = req.params.id

  Post.update({
    title: body.postTitle,
    author: body.author
  }, {
    where: {id:postId}
  })
  .then(result => {
    console.log("success");
  })
  .catch(err => {
    console.log("fail");
  })
});
*/

/*
///게시글 삭제 ///
router.delete('/board/:id', async (req, res, next) => {
  try {
    const postID = req.params.id;
    await Post.destroy({ where: { id: postId, userId: req.user.id }});
      res.send('OK');
      res.redirect('/');
  } catch (error) {
    console.error(error);
    next(error);
  }
});
*/


module.exports = router;