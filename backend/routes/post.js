const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./upload/"),
  filename : (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
})

const upload = multer({ storage });

router.post('/save_post', upload.single("file"), async (req, res) => {
  const { title, content, author } = req.body;
  const fileUrl = req.file ? `/upload/${req.file.filename}` : null;

  try {
    const newPost = new Post({ 
      title, 
      content, 
      author,
      fileUrl,
    });
    await newPost.save();
    res.status(201).json({ message: '글 저장 성공' });
  } catch (err) {
    console.error('글 저장 실패:', err);
    res.status(500).json({ error: '서버 에러' });
  }
});

router.get("/list", async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("author", "username")
            .sort({ createdAt : -1 });
        
        res.json(posts);
    } catch (err) {
        console.error("글 조회 실패", err);
        res.status(500).json({ error : "서버 에러" });
    }
});

router.get("/postDetail/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author");
    res.json(post);
    console.log(res);
  } catch (err) {
    res.status(500).json({ error : "게시글 조회 오류" })
  }
})

module.exports = router;