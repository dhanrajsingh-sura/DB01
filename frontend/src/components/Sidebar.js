// frontend/src/components/Sidebar.js
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const Sidebar = ({ isOpen = true, toggleSidebar }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { admin, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className={`sidebar ${!isOpen ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
                <div className="header-top">
                    {isOpen && (
                        <div className="brand">
                            <h2>EMS</h2>
                            <p>Employee Management</p>
                        </div>
                    )}
                    {toggleSidebar && (
                        <button className="toggle-btn" onClick={toggleSidebar} title={isOpen ? "Collapse" : "Expand"}>
                            {isOpen ? '◀' : '☰'}
                        </button>
                    )}
                </div>
            </div>

            <nav className="sidebar-nav">
                <Link
                    to="/dashboard"
                    className={location.pathname === '/dashboard' ? 'nav-item active' : 'nav-item'}
                    title="Dashboard"
                >
                    <span className="nav-icon">📊</span>
                    {isOpen && <span>Dashboard</span>}
                </Link>
                <Link
                    to="/employees"
                    className={location.pathname === '/employees' ? 'nav-item active' : 'nav-item'}
                    title="Employees"
                >
                    <span className="nav-icon">👥</span>
                    {isOpen && <span>Employees</span>}
                </Link>
            </nav>

            <div className="sidebar-footer">
                <div className="admin-info">
                    <div className="admin-avatar">
                        {admin?.username?.charAt(0).toUpperCase()}
                    </div>
                    {isOpen && (
                        <div className="admin-details">
                            <p className="admin-name">{admin?.username}</p>
                            <p className="admin-role">Administrator</p>
                        </div>
                    )}
                </div>
                <button onClick={handleLogout} className="logout-button" title="Logout">
                    {isOpen ? 'Logout' : '🚪'}
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
