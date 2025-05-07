import React, {useEffect, useState} from 'react';
import { useNavigate, Link } from "react-router-dom";
import { list_board } from "../../api/post";



function List() {

  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const handleWriteClick = () => {
    navigate('/write');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await list_board();
        setPosts(res.data);
      } catch (err) {
        console.error("글 목록 불러오기 실패 : ", err);
      }
    };

    fetchData();
  }, []);

    return (
      <div className="board-container">
      <h2 className="board-title">📋 게시판</h2>
      <table className="board-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={post._id}>
              <td>{posts.length - index}</td>
              <Link to={`/postDetail/${post._id}`}>{post.title}</Link>
              <td>{post.author.username}</td>
              {console.log("createdAt 확인:", post.createdAt)}
              <td>{new Date(post.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="board-button-area">
        <button className="write-button" onClick={handleWriteClick}>글쓰기</button>
      </div>
    </div>
  );
};

export default List;