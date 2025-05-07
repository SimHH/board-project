import { useState } from 'react';
import { register } from '../api/auth';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ username, password, email });
      alert("Registered successfully");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
      <input value={email} onChange={e => setEmail(e.target.value)} type = "email" placeholder = "Email"/>
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
