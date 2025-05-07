const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = 5000;

// 미들웨어
app.use(cors());
app.use(express.json());

// 라우터
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);

// DB 연결 & 서버 실행
mongoose.connect('mongodb://127.0.0.1:27017/board', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB 연결됨');
  app.listen(PORT, () => {
    console.log(`서버 실행 중: http://localhost:${PORT}`);
  });
})
.catch(err => {
  console.error('MongoDB 연결 실패:', err);
});