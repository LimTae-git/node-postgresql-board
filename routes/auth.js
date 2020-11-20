const express = require('express');
const passport = require('passport');
const bcryptjs = require('bcryptjs');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User, Post } = require('../models');

const router = express.Router();

/// 회원가입 라우터 ///
router.post('/join', isNotLoggedIn, async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      req.flash('joinError', '이미 가입된 이메일 입니다.');
      return res.redirect('/join');
    }
    const hash = await bcryptjs.hash(password,12);
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res.redirect('/login');
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

/// 로그인 라우터 ///
router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      req.flash('loginError', info.message);
      return res.redirect('/login');
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect('/');
    });
  }) (req, res, next);
});


/// 로그아웃 라우터 ///
router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});


module.exports = router;