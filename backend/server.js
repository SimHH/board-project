require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const commentRoutes = require("./routes/comment");
const path = require("path");

const app = express();
const PORT = 5000;

require('./config/passport')();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use('/api/user', authRoutes);
app.use('/api/post', postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/upload", express.static(path.join(__dirname, "upload")));

app.use('/', require('./routes/auth'));

const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('✅ MongoDB 연결 성공');
    app.listen(PORT, () => {
      console.log(`서버 실행 중: http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB 연결 실패:', err);
  });
