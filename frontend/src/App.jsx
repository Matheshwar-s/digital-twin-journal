import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { ParallaxProvider } from 'react-scroll-parallax';
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Journals from "./pages/Journals";
import Twin from "./pages/Twin";
import Settings from "./pages/Settings";
import PastYouChat from "./pages/PastYouChat";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ParallaxProvider><Home /></ParallaxProvider> } />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/dashboard/journals" element={<Journals />} />
        <Route path="/dashboard/twin" element={<Twin />} />
        <Route path="/dashboard/settings" element={<Settings />} />
        <Route path="/dashboard/chat" element={<PastYouChat />} />
      </Routes>
    </Router>
  );
}
