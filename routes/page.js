const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post, User } = require('../models');
const router = express.Router();

/// 메인 페이지 ///
router.get('/', (req, res, next) => {
  Post.findAll({
    include: [{
      model: User,
      attributes: ['id', 'nick', 'updatedAt'],
    }],
    order: [['createdAt', 'DESC']],
  })
  .then((post) => {
    res.render('main', {
      title: 'board',
      posts: post,
      user: req.user,
      loginError: req.flash('loginError'),
    });
  })
  .catch((error) => {
    console.error(error);
    next(error);
  });
});

/// 로그인 페이지 ///
router.get('/login', isNotLoggedIn, (req, res) => {
  res.render('login', {
    title: '로그인',
    user: req.user,
    loginError: req.flash('loginError'),
  })
})

/// 회원가입 페이지 ///
router.get('/join', isNotLoggedIn, (req, res) => {
  res.render('join', {
    title: '회원가입',
    user: req.user,
    joinError: req.flash('joinError'),
  })
})

/// 글쓰기 페이지 ///
router.get('/write', isLoggedIn, (req, res) => {
  res.render('write', {
    title: '글쓰기',
    user: req.user,
  })
})

/// 게시글 보기 페이지 ///
router.get('/board/:id', isLoggedIn, (req, res, next) => {
  const postID = req.params.id;
  Post.findOne({
    where: {id:postID}
  })
  .then(result => {
    res.render('board', {
      post: result,
      user: req.user,
    });
  })
  .catch((error) => {
    console.error(error);
    next(error);
  })
});

module.exports = router;