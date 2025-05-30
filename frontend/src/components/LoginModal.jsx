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
    <div style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
        justifyContent: 'center', alignItems: 'center', zIndex: 999,
    }}>
        <div style={{
            backgroundColor: '#fff',
            padding: '30px 40px',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            width: '360px',
            maxWidth: '90%',
            position: 'relative'
        }}>
            <button onClick={onClose} style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "none",
                border: "none",
                fontSize: "18px",
                cursor: "pointer"
            }}>✕</button>
    <div style={styles.container}>
      <h2>로그인</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <div className='login-wrap'>
        <label htmlFor="Id">아이디</label>
        <input
          id = "Id"
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
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
          style={styles.input}
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

const styles = {
  container: {
    margin: '100px auto',
    width: '300px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
};

export default LoginModal;