const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const passport = require("passport");
const authMiddleware = require("../middleware/authToken");
const SECRET = process.env.JWT_SECRET;

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !await user.comparePassword(password)) {
    return res.status(401).json({ error: "아이디 또는 비밀번호를 확인해주세요." });
  }
  const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1h' });
  res.json({ 
    token,
    user: { 
      _id: user._id,
      username: user.username }
   });
});

router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    try {
      if (await User.findOne({ username }) || await User.findOne({ email })) {
          return res.status(400).json({ error : "이미 가입된 아이디 또는 이메일입니다." });
      }
      const newUser = new User({ username, password, email, provider: "local" });
      await newUser.save();
      return res.status(201).json({ message : "register success" });
    }
    catch (err) {
      console.error("register error", err);
      return res.status(500).json({ error : "server error" });
    }
})

router.get("/authMe", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "서버 에러" });
  }
});


router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = req.user.token;
    res.redirect(`http://localhost:3000/social-success?token=${token}`);
  }
);

router.get("/auth/kakao", passport.authenticate("kakao"));
router.get("/auth/kakao/callback",
  passport.authenticate("kakao", { session: false }),
  (req, res) => {
    const token = req.user.token;
    res.redirect(`http://localhost:3000/social-success?token=${token}`);
  }
);

router.get("/auth/git", passport.authenticate("github", { scope: ["user:email"] }));
router.get(
  "/auth/git/callback",
  passport.authenticate("github", { session: false }),
  (req, res) => {
    const token = req.user.token;
    res.redirect(`http://localhost:3000/social-success?token=${token}`);
  }
);

module.exports = router;