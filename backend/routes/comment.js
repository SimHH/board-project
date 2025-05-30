const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");
const authMiddleware = require("../middleware/authToken");

router.post("/:postId", authMiddleware, async (req, res) => {
  try {
    const comment = new Comment({
      content: req.body.content,
      author: req.user.id,
      post: req.params.postId,
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    console.error("댓글 저장 실패:", err);
    res.status(500).json({ error: "댓글 저장 실패" });
  }
});

router.get("/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate("author", "username")
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    console.error("댓글 조회 실패:", err);
    res.status(500).json({ error: "댓글 조회 실패" });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);
      if (!comment) return res.status(404).json({ error: "댓글을 찾을 수 없습니다." });
  
      if (comment.author.toString() !== req.user.id) {
        return res.status(403).json({ error: "댓글 수정 권한이 없습니다." });
      }
  
      comment.content = req.body.content;
      await comment.save();
  
      res.json({ message: "댓글 수정 완료", comment });
    } catch (err) {
      console.error("댓글 수정 오류:", err);
      res.status(500).json({ error: "server error" });
    }
  });

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: "댓글이 존재하지 않습니다." });
    }
    if (comment.author.toString() !== req.user.id) {
      return res.status(403).json({ error: "삭제 권한이 없습니다." });
    }

    await comment.deleteOne();
    res.json({ message: "댓글이 삭제되었습니다." });
  } catch (err) {
    console.error("댓글 삭제 실패:", err);
    res.status(500).json({ error: "댓글 삭제 실패" });
  }
});

module.exports = router;
