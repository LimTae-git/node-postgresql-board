const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

/// 메인 페이지 ///
router.get('/', (req, res, next) => {
  res.render('main', {
    title: 'messageBoard',
    contents: [],
    user: req.user,
    loginError: req.flash('loginError'),
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


module.exports = router;