import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import InstructionPage from "./pages/InstructionPage.jsx";
import InterviewPage from "./pages/InterviewPage.jsx";
import AuthPage from "./pages/AuthPage";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/instructions" element={<InstructionPage />} />
        <Route path="/interview" element={<InterviewPage />} />
        <Route path="/signin" element={<AuthPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
    
        
      </Routes>
    </Router>
  );
}

export default App;
