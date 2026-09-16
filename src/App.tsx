import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, About, Experience, Project, Games } from './pages';
import { Navbar, SettingsButton } from './components';
import siteConfig from './config';
import './App.css'

export default function App() {
  useEffect(() => {
    if (siteConfig.meta.title) {
      document.title = siteConfig.meta.title;
    }
  }, []);

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Navbar />
      <SettingsButton />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/games" element={<Games />} />
      </Routes>
    </BrowserRouter>
  );
}

