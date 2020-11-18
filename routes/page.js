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
    }, {
      model: User,
      attributes: ['id', 'nick'],
    }],
    order: [['createdAt', 'DESC']],
  })
  .then((post) => {
    res.render('main', {
      title: 'Board',
      board: post,
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
router.get('/login', (req, res) => {
  res.render('login')
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


module.exports = router;