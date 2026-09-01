import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

export function Navbar() {
    const {t} = useTranslation();
    return (
    <div id="navbar-container">
        <Link className="navbar-button" to="/">{t('navbar.home')}</Link>
        <Link className="navbar-button" to="/about">{t('navbar.about')}</Link>
        <Link className="navbar-button" to="/experience">{t('navbar.experience')}</Link>
        <Link className="navbar-button" to="/projects">{t('navbar.projects')}</Link>
        <Link className="navbar-button" to="/games">{t('navbar.games')}</Link>
    </div>
    );
}