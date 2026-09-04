import { NavLink} from 'react-router-dom'
import { useTranslation } from 'react-i18next';

export function Navbar() {
    const {t} = useTranslation();
    return (
    <div id="navbar-container">
        <NavLink 
            id="home" 
            className={({ isActive }) => isActive ? 'navbar-button active' : 'navbar-button'}               
            to="/">{t('navbar.home')}
        </NavLink>
        <NavLink 
            id="about" 
            className={({ isActive }) => isActive ? 'navbar-button active' : 'navbar-button'}
            to="/about">{t('navbar.about')}
        </NavLink>
        <NavLink 
            id="experience" 
            className={({ isActive }) => isActive ? 'navbar-button active' : 'navbar-button'} 
            to="/experience">{t('navbar.experience')}
        </NavLink>
        <NavLink 
            id="projects" 
            className={({ isActive }) => isActive ? 'navbar-button active' : 'navbar-button'}
            to="/projects">{t('navbar.projects')}
        </NavLink>
        <NavLink 
            id="games" 
            className={({ isActive }) => isActive ? 'navbar-button active' : 'navbar-button'} 
            to="/games">{t('navbar.games')}
        </NavLink>
    </div>
    );
}
