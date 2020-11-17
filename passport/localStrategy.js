const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const { User } = require('../models');

module.exports = (passport) => {
  passport.user(new LocalStrategy({
    usernameFiled: 'email',
    passwordFiled: 'password',
  }, async (email, password, done) => {
    try {
      const exUser = await User.findOne({ where: {email } });
      if (exUser) {
        const result = await bcrypt.compare(password, exUser.password);
        if (result) {
          done(null, exUser);
        } else {
          done(null, false, { message : '비밀번호가 일치 하지 않습니다.' });
        }
      } else {
        done(null, false, { message : '가입되지 않은 회원입니다' });
      }
    } catch(error) {
      console.error(error);
      done(error);
    }
  }));
};