import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from "react";
import List from "./pages/board/List";
import Register from "./pages/RegisterPage";
import Write from "./pages/board/WritePost";
import PostDetail from "./pages/board/PostDetail"
import SocialSuccess from "./components/SocialSuccess";
import Header from "./components/Header";
import LoginModal from "./components/LoginModal";
import EditPost from './pages/board/EditPost';

import { AuthProvider } from "./context/AuthContext";

function App() {

  const [showLogin, setShowLogin] = useState(false);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Header onLoginClick={() => setShowLogin(true)}/>
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/social-success" element={<SocialSuccess />} />
          <Route path="/register" element={<Register />}/>
          <Route path="/write" element={<Write />}/>
          <Route path="/edit/:id" element={<EditPost />}/>
          <Route path="/postDetail/:id" element={<PostDetail/>} />
        </Routes>
        {showLogin && <LoginModal onClose={() => setShowLogin(false)}/>}
      </BrowserRouter>
    </AuthProvider>
    
  );
}

export default App;