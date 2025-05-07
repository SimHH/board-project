import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getPost } from "../../api/post";

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
 
  useEffect(() => {
    getPost(id)
      .then(res => setPost(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!post) return <div>로딩 중...</div>;

  return (
    <div className="post-detail">
      <h2>{post.title}</h2>
      <p><strong>작성자:</strong> {post.author.username}</p>
      <p><strong>작성일:</strong> {new Date(post.createdAt).toLocaleDateString()}</p>
      <div>{post.content}</div>
    </div>
  );
}

export default PostDetail;