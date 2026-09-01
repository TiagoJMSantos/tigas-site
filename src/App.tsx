import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, About, Experience, Project, Games } from './pages';
import { Navbar, SettingsButton } from './components';
import './App.css'
import './i18n';

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      {}
      <Navbar></Navbar>
      <SettingsButton></SettingsButton>
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