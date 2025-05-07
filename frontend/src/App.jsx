import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from "react";
import List from "./pages/board/List";
import Register from "./pages/RegisterPage";
import Write from "./pages/board/WritePost";
import PostDetail from "./pages/board/PostDetail"

import Header from "./components/Header";
import LoginModal from "./components/LoginModal";


function App() {

  const [showLogin, setShowLogin] = useState(false);

  return (
    <BrowserRouter>
      <Header onLoginClick={() => setShowLogin(true)}/>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/register" element={<Register />}/>
        <Route path="/write" element={<Write />}/>
        <Route path="/postDetail/:id" element={<PostDetail/>} />
      </Routes>
      {showLogin && <LoginModal onClose={() => setShowLogin(false)}/>}
    </BrowserRouter>
  );
}

export default App;