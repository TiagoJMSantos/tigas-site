import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AiFillMoon, AiFillSun } from 'react-icons/ai';
import { LuTerminal } from 'react-icons/lu';
import siteConfig from '../config';

function useColourMode() {
    const [isDark, setIsDark] = useState<boolean>(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') return true;
        if (savedTheme === 'light') return false;
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });
    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }, [isDark]);
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (event: MediaQueryListEvent) => {
            const savedTheme = localStorage.getItem('theme');
            if (!savedTheme) {
                setIsDark(event.matches);
            }
        };
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);
    const toggleTheme = () => {
        setIsDark((prev) => {
            const next = !prev;
            localStorage.setItem('theme', next ? 'dark' : 'light');
            return next;
        });
    };
    return { isDark, toggleTheme };
}

export function Navbar() {
    const { isDark, toggleTheme } = useColourMode();
    return (
    <div id="navbar-container">
        <div className="navbar-name-container">
            <LuTerminal className="navbar-terminal-icon" />
            <span>{siteConfig.terminal.prompt}</span>
        </div>
        <div className="buttons-container">
            <NavLink 
                id="home" 
                className={({ isActive }) => isActive ? 'navbar-button active' : 'navbar-button'}  
                to="/">Home
            </NavLink>
            <NavLink 
                id="projects" 
                className={({ isActive }) => isActive ? 'navbar-button active' : 'navbar-button'}
                to="/projects">Projects
            </NavLink>
            <button 
                type="button"
                className="navbar-button navbar-theme-indicator" 
                onClick={toggleTheme}
                title={isDark ? 'Switch to Light mode' : 'Switch to Dark mode'}
                aria-label={isDark ? 'Switch to Light mode' : 'Switch to Dark mode'}
            >
                {isDark ? (
                    <AiFillMoon className="theme-icon moon-icon" />
                ) : (
                    <AiFillSun className="theme-icon sun-icon" />
                )}
            </button>
        </div>
    </div>
    );
}
