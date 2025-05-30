import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState("");
  const { register } = useContext(AuthContext);

  const navigate = useNavigate();



  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ username, password, email });
      alert("회원가입이 완료되었습니다.\n재로그인 해주세요.");
      navigate("/");
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <div className="register-container">
    <form className="register-form" onSubmit={onSubmit}>
      <label className="register-label-style" htmlFor="RegisterId">아이디</label>
      <input className="register-input" value={username} 
      onChange={e => setUsername(e.target.value)} 
      placeholder="Username"
      id = "RegisterId"
       />

      <label className="register-label-style" htmlFor="RegisterPW">비밀번호</label>
      <input className="register-input" value={password} 
      onChange={e => setPassword(e.target.value)} 
      type="password" 
      placeholder="Password"
      id = "RegisterPW"
       />

      <label className="register-label-style" htmlFor = "RegisterEmail">이메일</label>
      <input className="register-input" value={email} 
      onChange={e => setEmail(e.target.value)} 
      type = "email" 
      placeholder = "Email"/>

      <button className="register-btn" type="submit">회원가입</button>
    </form>
    </div>

  );
}

export default Register;
