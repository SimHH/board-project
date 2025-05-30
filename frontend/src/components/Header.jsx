import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Header({onLoginClick}) {
    const { isLogin, logout, user } = useContext(AuthContext);
    const navigate = useNavigate();

    

    return (
        <header className="header-style">
            <h2 className="board-title" onClick={()=> {navigate("/")}}>📋 게시판</h2>
            {isLogin && user ? (
            
                    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                        <span>{user.username}님 환영합니다</span>
                        <button onClick={() => {
                            if (window.confirm("로그아웃하시겠습니까?")) {
                                logout();
                                navigate("/");
                            }
                        }}
                        className="login-header-button">로그아웃</button>
                    </div>



            ) : (
                <button onClick={onLoginClick}
               className="login-header-button">로그인</button>
            )}


        </header>
    )
}

export default Header;