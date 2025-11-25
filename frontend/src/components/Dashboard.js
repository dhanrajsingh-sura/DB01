// frontend/src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Sidebar from './Sidebar';
import './Dashboard.css';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            const response = await api.get('/dashboard/stats');
            setStats(response.data);
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="app-layout">
                <Sidebar />
                <div className="main-content">
                    <div className="loading-container">Loading dashboard...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="app-layout">
            <Sidebar />
            <div className="main-content">
                <div className="dashboard-header">
                    <h1>Dashboard</h1>
                    <p>Welcome back! Here's an overview of your organization</p>
                </div>

                <div className="stats-grid">
                    <div className="stat-card total">
                        <div className="stat-icon">👥</div>
                        <div className="stat-info">
                            <h3>{stats?.totalEmployees || 0}</h3>
                            <p>Total Employees</p>
                        </div>
                    </div>

                    {stats?.departmentBreakdown?.map((dept, index) => (
                        <div key={dept.dept_name} className={`stat-card dept-${index + 1}`}>
                            <div className="stat-icon">
                                {dept.dept_name === 'HR' ? '🎯' :
                                    dept.dept_name === 'IT' ? '💻' :
                                        dept.dept_name === 'Finance' ? '💰' : '📋'}
                            </div>
                            <div className="stat-info">
                                <h3>{dept.count}</h3>
                                <p>{dept.dept_name} Department</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="recent-section">
                    <div className="section-header">
                        <h2>Recent Employees</h2>
                        <button
                            onClick={() => navigate('/employees')}
                            className="view-all-button"
                        >
                            View All →
                        </button>
                    </div>

                    <div className="recent-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Department</th>
                                    <th>Hire Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats?.recentEmployees?.length > 0 ? (
                                    stats.recentEmployees.map((emp) => (
                                        <tr key={emp.emp_id}>
                                            <td>{emp.emp_id}</td>
                                            <td>{emp.emp_name}</td>
                                            <td>{emp.email}</td>
                                            <td>
                                                <span className="dept-badge">
                                                    {emp.dept_name || 'N/A'}
                                                </span>
                                            </td>
                                            <td>
                                                {emp.hire_date
                                                    ? new Date(emp.hire_date).toLocaleDateString()
                                                    : 'N/A'}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center' }}>
                                            No employees found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
