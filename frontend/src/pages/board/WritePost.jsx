import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { write_board } from '../../api/post';
import { jwtDecode } from 'jwt-decode';


function WritePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }

    const decoded = jwtDecode(token);
    const userId = decoded.id;

    if (!userId) {  
      alert('유효하지 않은 사용자 정보입니다.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("author", userId);
      if(file) formData.append("file", file);

      const res = await write_board(formData);

      alert('글이 저장되었습니다!');
      navigate('/');
    } catch (err) {
      alert('글 저장 실패');
    }
  };

  return (
    <div className="write-container">
      <h2>📝 글쓰기</h2>
      
      <form className="write-submit-form" onSubmit={handleSubmit}>
        <label className="title-label" htmlFor="title">제목</label>
        <input
          id="title"
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="title-input content-margin"
        />
        <label className="content-label" htmlFor="content">내용</label>
        <textarea
          id="content"
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="content-input content-margin"
        />
        <div className="file-write-btn content-margin">
          <input type = "file" onChange={handleFileChange} />
          <button className="write-submit-btn" type="submit">등록</button>
        </div>

      </form>

    </div>

  );
}

export default WritePost;