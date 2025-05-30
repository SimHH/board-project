const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const multer = require("multer");
const path = require("path");
const authMiddleware = require("../middleware/authToken");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./upload/"),
  filename : (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
})

const upload = multer({ storage });

router.post("/save_post", authMiddleware, upload.single("file"),
  async (req, res) => {
    const { title, content } = req.body;
    const fileUrl = req.file ? `upload/${req.file.filename}` : null;

    try {
      const newPost = new Post({
        title,
        content,
        author: req.user.id,
        fileUrl,
      });

      await newPost.save();
      res.status(201).json({ message: '글 저장 성공' });
    } catch (err) {
      console.error('글 저장 실패:', err);
      res.status(500).json({ error: '서버 에러' });
    }
  }
);


router.get("/postDetail/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author");
    console.log(post.author._id);
    res.json(post);
  } catch (err) {
    res.status(500).json({ error : "게시글 조회 오류" })
  }
})

router.put("/:id", authMiddleware, upload.single("file"), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "게시글이 존재하지 않습니다." });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ error: "수정 권한이 없습니다." });
    }

    post.title = req.body.title;
    post.content = req.body.content;

    if (req.file) {
      if (post.fileUrl) {
        const filePath = path.join(__dirname, "..", post.fileUrl);
        fs.unlink(filePath, (err) => {
          if (err) console.error("파일 삭제 실패:", err);
        });
      }
      post.fileUrl = `/upload/${req.file.filename}`;
    }
    if (req.body.deleteFile === "true" && post.fileUrl) {
      const filePath = path.join(__dirname, "..", post.fileUrl);
      fs.unlink(filePath, (err) => {
        if (err) console.error("파일 삭제 실패:", err);
      });
      post.fileUrl = null;
    }

    await post.save();
    res.json({ message: "게시글 수정 완료", post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "error" });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "게시글이 존재하지 않습니다." });
    }
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ error: "삭제 권한이 없습니다." });
    }
    await Post.deleteOne({ _id: req.params.id });
    res.json({ message: "게시글이 삭제되었습니다." });
  } catch (err) {
    res.status(500).json({ error: "error" });
  }
});

router.get("/posts", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    const query = search
      ? { title: { $regex: search, $options: "i" } }
      : {};

    const totalPosts = await Post.countDocuments(query);
    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("author", "username");

    res.json({
      posts,
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: page,
      totalPosts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "게시글 검색 실패" });
  }
});


module.exports = router;