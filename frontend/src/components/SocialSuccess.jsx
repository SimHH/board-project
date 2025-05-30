import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SocialSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      navigate("/");
    }
  }, []);

  return <div>잠시만요...</div>;
}

export default SocialSuccess;