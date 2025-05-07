const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const SECRET = 'your_jwt_secret'; // 실제 배포 시엔 .env로 관리

// 로그인 API
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ error: '존재하지 않는 사용자입니다.' });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ error: '비밀번호가 틀렸습니다.' });
  }

  const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;

    try {

      const existUser = await User.findOne({ username });
      if (existUser) {
          return res.status(400).json({ error : "이미 존재하는 ID입니다." });
      }
  
      const newUser = new User({ username, password, email });
      await newUser.save();
  
      return res.status(201).json({ message : "회원가입 성공" });
  
  

    }
    catch (err) {
      console.error("회원가입 에러", err);
      return res.status(500).json({ error : "서버 오류" });
    }

})


module.exports = router;