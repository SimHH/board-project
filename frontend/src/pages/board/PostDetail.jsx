import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext, useRef } from "react";
import { getPost, deletePost, secureDownload } from "../../api/post";
import { getComments, createComment, deleteComment, updateComment, } from "../../api/comment";
import { AuthContext } from "../../context/AuthContext";
import { handleFileDownload } from "../../utils/download";

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { isLogin, user, loading } = useContext(AuthContext);
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const navigate = useNavigate();
  const warnedRef = useRef(false);

  useEffect(() => {
    if (!loading && !isLogin && !warnedRef.current) {
      warnedRef.current = true;
      alert("로그인이 필요합니다.");
      navigate("/");
    }
  }, [loading, isLogin, navigate]);

  useEffect(() => {
    getPost(id)
      .then((res) => setPost(res.data))
      .catch((err) => console.error("게시글 로딩 실패:", err));

    getComments(id)
      .then((res) => setComments(res.data))
      .catch((err) => console.error("댓글 로딩 실패:", err));
  }, [id]);

  if (!post) return <div>로딩 중...</div>;

  const isAuthor = isLogin && user && post.author._id === user._id;

  const handleDeletePost = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await deletePost(id);
        alert("삭제되었습니다.");
        navigate("/");
      } catch (err) {
        alert("삭제 실패: " + err.response?.data?.error || err.message);
      }
    }
  };


  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    try {
      await createComment(id, newComment);
      setNewComment("");
      const res = await getComments(id);
      setComments(res.data);
      alert("댓글이 등록되었습니다.")
    } catch (err) {
      alert("댓글 작성 실패");
    }
  };

  const startEdit = (comment) => {
    setEditingId(comment._id);
    setEditContent(comment.content);
  };

  const handleUpdateComment = async () => {
    if (!editContent.trim()) return;
  
    try {
      await updateComment(editingId, editContent);
      const res = await getComments(id);
      setComments(res.data);
      setEditingId(null);
      setEditContent("");
    } catch (err) {
      alert("댓글 수정 실패");
    }
  };
  

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("댓글을 삭제하시겠습니까?")) return;
    try {
      await deleteComment(commentId);
      setComments(comments.filter((c) => c._id !== commentId));
    } catch (err) {
      alert("댓글 삭제 실패");
    }
  };


return (
  <div className="write-container">
    <div>    
      <h2 className="content-margin">{post.title}
          <span className="create-time-form">
      {new Date(post.createdAt).toLocaleString()}
  </span>
      </h2>
      <p className="content-margin-form">{post.content}</p>
        {post.fileUrl && (
            <p>
              📁{" "}
              <button onClick={() => handleFileDownload(post.fileUrl)} className="file-form">
                {post.fileUrl.split("-").slice(1).join("-")}
            </button>
            </p>

        )}
      <p className="author-form">작성자: {post.author.username}</p>

    </div>

    {isAuthor && (
      <div className="edit-del-form">
        <button className="edit-btn" onClick={() => navigate(`/edit/${post._id}`)}>수정</button>
        <button className="delete-btn" onClick={handleDeletePost}>삭제</button>
      </div>
    )}


    <div className="content-margin detail-form">
      <h3>💬 댓글</h3>

      {isLogin && (
        <div className="comment comment-form">
          <textarea
            rows="3"
            className="comment-input"
            placeholder="댓글을 입력하세요"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            className="comment-write-btn"
            onClick={handleCommentSubmit}
          >
            댓글 작성
          </button>
        </div>
      )}

      <ul className="content-margin">
        {comments.map((comment) => (
          <li className="comment-list-form" key={comment._id} style={{ marginBottom: "1rem" }}>
            <strong>{comment.author.username}</strong>
            {editingId === comment._id ? (
              <>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  rows="2"
                  className="comment-edit-form"
                />
                <div style={{ marginTop: "0.5rem", marginBottom: "20px"}}>
                  <button className="comment-edit-btn" onClick={handleUpdateComment}>저장</button>
                  <button className="comment-edit-btn"  onClick={() => setEditingId(null)} style={{ marginLeft: "0.5rem" }}>
                    취소
                  </button>
                </div>
              </>
            ) : (
              <>
                {isLogin && String(user?._id) === String(comment.author._id) && (
                  <>
                    <button
                    className="comment-edit-btn"
                      onClick={() => {
                        setEditingId(comment._id);
                        setEditContent(comment.content);
                      }}
                      style={{ marginLeft: "1rem" }
                    }
                    >
                      수정
                    </button>
                    <button
                    className="comment-del-btn"
                      onClick={() => handleDeleteComment(comment._id)}
                      style={{ marginLeft: "0.5rem", color: "black" }}
                    >
                      삭제
                    </button>
                  </>
                )}
                <p>{comment.content}</p>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

}

export default PostDetail;
