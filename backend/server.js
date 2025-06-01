const path = require("path");

if (process.env.NODE_ENV !== 'docker') {
  require('dotenv').config({ path: path.join(__dirname, '../.env') });
}

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');

const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const commentRoutes = require("./routes/comment");

const app = express();
const PORT = process.env.PORT || 5000;

require('./config/passport')();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use('/api/user', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/', require('./routes/auth'));

let mongoURL;

if (process.env.NODE_ENV === 'docker') {
  console.warn("docker!!!");
  mongoURL = process.env.MONGO_URL_DOCKER || 'mongodb://mongo:27017/board';
} else {
  console.warn("local!!!");
  mongoURL = process.env.MONGO_URL_LOCAL || 'mongodb://localhost:27017/board';
}

mongoose.connect(mongoURL)
  .then(() => {
    console.log('MongoDB 연결 성공');
    app.listen(PORT, () => {
      console.log(`서버 실행 중: http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB 연결 실패:', err);
  });
