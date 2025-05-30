import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { list_board } from "../../api/post";
import { AuthContext } from "../../context/AuthContext";

function List() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const POSTS_PER_PAGE = 10;

  const navigate = useNavigate();
  const { isLogin, user } = useContext(AuthContext);

  const handleWriteClick = () => {
    if (isLogin && user) {
      navigate("/write");
    } else {
      alert("로그인이 필요합니다.");
    }
  };

  const fetchData = async () => {
    try {
      const res = await list_board(currentPage, POSTS_PER_PAGE, searchKeyword);
      setPosts(res.data.posts);
      setTotalPages(res.data.totalPages);
      setTotalPosts(res.data.totalPosts); // ✅ totalPosts 받기
    } catch (err) {
      console.error("글 목록 불러오기 실패:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  return (
    <div className="mother-board">
      <div className="board-container">
        <form
          className="search-form"
          onSubmit={(e) => {
            e.preventDefault();
            setCurrentPage(1);
            fetchData();
          }}
        >
          <input
            type="text"
            placeholder="제목 검색"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <button className="search-btn" type="submit">
            검색
          </button>
        </form>

        <table className="board-table">
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody className="post">
            {posts.map((post, index) => (
              <tr className="post-tr" key={post._id}>
                <td className="post-form">
                  <a>{(totalPosts - ((currentPage - 1) * POSTS_PER_PAGE)) - index}</a>
                </td>
                <td>
                  <Link to={`/postDetail/${post._id}`} className="post-form post-detail">
                    {post.title}
                  </Link>
                </td>
                <td className="post-form">{post.author.username}</td>
                <td>
                  <span className="post-form">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              style={{
                margin: "0 5px",
                padding: "5px 10px",
                backgroundColor: currentPage === i + 1 ? "orange" : "#eee",
                color: currentPage === i + 1 ? "black" : "#000",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <div className="board-button-area">
          <button className="write-button" onClick={handleWriteClick}>
            글쓰기
          </button>
        </div>
      </div>
    </div>
  );
}

export default List;
