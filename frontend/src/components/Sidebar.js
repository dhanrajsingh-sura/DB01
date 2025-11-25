// frontend/src/components/Sidebar.js
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { admin, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h2>EMS</h2>
                <p>Employee Management</p>
            </div>

            <nav className="sidebar-nav">
                <Link
                    to="/dashboard"
                    className={location.pathname === '/dashboard' ? 'nav-item active' : 'nav-item'}
                >
                    <span className="nav-icon">📊</span>
                    <span>Dashboard</span>
                </Link>
                <Link
                    to="/employees"
                    className={location.pathname === '/employees' ? 'nav-item active' : 'nav-item'}
                >
                    <span className="nav-icon">👥</span>
                    <span>Employees</span>
                </Link>
            </nav>

            <div className="sidebar-footer">
                <div className="admin-info">
                    <div className="admin-avatar">
                        {admin?.username?.charAt(0).toUpperCase()}
                    </div>
                    <div className="admin-details">
                        <p className="admin-name">{admin?.username}</p>
                        <p className="admin-role">Administrator</p>
                    </div>
                </div>
                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
