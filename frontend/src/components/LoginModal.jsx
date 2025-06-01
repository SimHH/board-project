import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";

function LoginModal({onClose}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login({ username, password });
      navigate('/');
      onClose();
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  const handleGoToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="modal-overlay">
        <div className="login-modal">
            <button onClick={onClose} className="login-close-btn">✕</button>
    <div className="login-container">
      <h2 className="login-text">로그인</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className='login-wrap'>
        <label htmlFor="Id">아이디</label>
        <input
          id = "Id"
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        </div>
        <div className='login-wrap'>
        <label htmlFor='password'>비밀번호</label>
        <input
          id='password'
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        <button className="login-button" type="submit" >로그인</button>
      </form>
      <div className='login-footer' style={{ marginTop: '20px', marginBottom: "30px"}}>
        <span>계정이 없으신가요?</span>
        <button className='register-button' onClick={() => {
            handleGoToRegister();
            onClose();
        }}>회원가입</button>
      </div>
      <div className="social-Login">
        <span>소셜 로그인</span>
          <a href="http://localhost:5000/auth/google">
            <button className="social-button google-login">
              <img src="/images/google.png" alt="" className="social-icon"/>
            </button>
          </a>
          <a href="http://localhost:5000/auth/kakao">
            <button className="social-button kakao-login">
              <img src="/images/kakao.png" alt="" className="social-icon"/>
            </button>
          </a>
          <a href="http://localhost:5000/auth/git">
            <button className="social-button git-login">
              <img src="/images/github.png" alt="" className="social-icon"/>
            </button>
          </a>
      </div>
    </div>
    </div>
    </div>
  );
}


export default LoginModal;