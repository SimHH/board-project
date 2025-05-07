// import { useState } from 'react';
// import { login } from '../api/auth';
// import { useNavigate } from 'react-router-dom';

// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await login({ username, password });
//       localStorage.setItem('token', res.data.token);
//       navigate('/list');
//     } catch (err) {
//       alert('아이디 또는 비밀번호를 확인해주세요.');
//     }
//   };

//   const handleGoToRegister = () => {
//     navigate('/register');
//   };

//   return (
//     <div className="board-container" style={styles.container}>
//       <h2>로그인</h2>
//       <form onSubmit={handleLogin} style={styles.form}>
//         <div className='login-wrap'>
//         <label htmlFor="Id">Id</label>
//         <input
//           type="text"
//           placeholder="아이디"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           style={styles.input}
//         />
//         </div>
//         <div className='login-wrap'>
//         <label htmlFor='password'>Password</label>
//         <input
//           id='password'
//           type="password"
//           placeholder="비밀번호"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           style={styles.input}
//         />
//         </div>
//         <button className='login-button' type="submit" style={styles.button}>로그인</button>
//       </form>
//       <div className='login-footer' style={{ marginTop: '20px', marginBottom: "30px"}}>
//         <span>계정이 없으신가요?</span>
//         <button onClick={handleGoToRegister} style={styles.button}>회원가입</button>
//       </div>


//       <div className="social-Login">
//         <span>소셜 로그인</span>
//           <a href="http://localhost:5000/auth/google">
//             <button className="social-button google-login">
//               <img src="/images/google.png" className="social-icon"/>
//             </button>
//           </a>
//           <a href="http://localhost:5000/auth/kakao">
//             <button className="social-button kakao-login">
//               <img src="/images/kakao.png" className="social-icon"/>
//             </button>
//           </a>
//           <a href="http://localhost:5000/auth/git">
//             <button className="social-button git-login">
//               <img src="/images/github.png" className="social-icon"/>
//             </button>
//           </a>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     margin: '100px auto',
//     width: '300px',
//     textAlign: 'center',
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '15px',
//   },
//   input: {
//     padding: '10px',
//     fontSize: '16px',
//   },
//   button: {
//     padding: '10px',
//     color: 'white',
//     border: 'none',
//     fontSize: '16px',
//     cursor: 'pointer',
//   },
// };

// export default Login;