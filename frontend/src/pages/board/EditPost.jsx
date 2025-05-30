import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPost, updatePost } from "../../api/post"; 

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [fileDeleted, setFileDeleted] = useState(false);

  useEffect(() => {
    getPost(id)
      .then(res => {
        setPost(res.data);
        setTitle(res.data.title);    
        setContent(res.data.content); 
      })
      .catch(err => {
        console.error(err);
        navigate("/");
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (file) {
        formData.append("file", file);
      }
      if (fileDeleted) {
        formData.append("deleteFile", "true");
      }
  
      await updatePost(id, formData);
      alert("게시글이 수정되었습니다.");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("error");
    }
  };
  

  if (!post) return <div>잠시만요...</div>;

  return (
  <div className="write-container">
    <h2>📝 글 수정</h2>

    <form className="write-submit-form" onSubmit={handleSubmit}>
      <label className="title-label" htmlFor="title">제목</label>
      <input
        id="title"
        type="text"
        placeholder="제목"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        className="title-input content-margin"
      />

      <label className="content-label" htmlFor="content">내용</label>
      <textarea
        id="content"
        placeholder="내용을 입력하세요"
        value={content}
        onChange={e => setContent(e.target.value)}
        required
        className="content-input content-margin"
      />

      {post.fileUrl && !file && (
        <div className="content-margin">
          <p>
            기존 파일:{" "}
            <a href={`/${post.fileUrl}`} target="_blank" rel="noopener noreferrer">
              {post.fileUrl.split("/").pop()}
            </a>
            <button
              type="button"
              onClick={() => {
                setPost({ ...post, fileUrl: null });
                setFileDeleted(true);
              }}
              style={{ marginLeft: "1rem", color: "red" }}
            >
              삭제
            </button>
          </p>
        </div>
      )}

      <div className="file-write-btn content-margin">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button className="write-submit-btn" type="submit">수정 완료</button>
      </div>
    </form>
  </div>
);
}

export default EditPost;
