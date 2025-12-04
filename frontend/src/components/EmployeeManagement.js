// frontend/src/components/EmployeeManagement.js
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../utils/api';
import Sidebar from './Sidebar';
import './EmployeeManagement.css';

const EmployeeManagement = () => {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        emp_id: null,
        emp_name: '',
        email: '',
        phone: '',
        gender: 'M',
        dob: '',
        dept_id: '1',
        hire_date: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    useEffect(() => {
        // Filter employees based on search term
        if (searchTerm) {
            const filtered = employees.filter(emp =>
                emp.emp_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                emp.dept_name?.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredEmployees(filtered);
        } else {
            setFilteredEmployees(employees);
        }
    }, [searchTerm, employees]);

    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const res = await api.get('/employees');
            setEmployees(res.data);
            setFilteredEmployees(res.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
            toast.error('Failed to fetch employees');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isEditing) {
                await api.put(`/employees/${formData.emp_id}`, formData);
                toast.success('Employee updated successfully!');
            } else {
                await api.post('/employees', formData);
                toast.success('Employee added successfully!');
            }

            setFormData({
                emp_id: null,
                emp_name: '',
                email: '',
                phone: '',
                gender: 'M',
                dob: '',
                dept_id: '1',
                hire_date: '',
            });
            setIsEditing(false);
            fetchEmployees();
        } catch (error) {
            console.error('Error saving employee:', error);
            toast.error('Failed to save employee');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (emp) => {
        setFormData({
            emp_id: emp.emp_id,
            emp_name: emp.emp_name,
            email: emp.email,
            phone: emp.phone || '',
            gender: emp.gender || 'M',
            dob: emp.dob ? emp.dob.split('T')[0] : '',
            dept_id: emp.dept_id ? String(emp.dept_id) : '1',
            hire_date: emp.hire_date ? emp.hire_date.split('T')[0] : '',
        });
        setIsEditing(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this employee?')) return;

        try {
            await api.delete(`/employees/${id}`);
            toast.success('Employee deleted successfully!');
            fetchEmployees();
        } catch (error) {
            console.error('Error deleting employee:', error);
            toast.error('Failed to delete employee');
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setFormData({
            emp_id: null,
            emp_name: '',
            email: '',
            phone: '',
            gender: 'M',
            dob: '',
            dept_id: '1',
            hire_date: '',
        });
    };

    return (
        <div className="app-layout">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className={`main-content ${!isSidebarOpen ? 'expanded' : ''}`}>
                <div className="page-header">
                    <h1>Employee Management</h1>
                    <p>Add, edit, and manage employee records</p>
                </div>

                {/* Add/Edit Form */}
                <div className="form-card">
                    <h2>{isEditing ? '✏️ Edit Employee' : '➕ Add New Employee'}</h2>
                    <form onSubmit={handleSubmit} className="employee-form">
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Name *</label>
                                <input
                                    type="text"
                                    name="emp_name"
                                    value={formData.emp_name}
                                    onChange={handleChange}
                                    placeholder="Enter employee name"
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-group">
                                <label>Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter email address"
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-group">
                                <label>Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter phone number"
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-group">
                                <label>Gender</label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    disabled={loading}
                                >
                                    <option value="M">Male</option>
                                    <option value="F">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Date of Birth</label>
                                <input
                                    type="date"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-group">
                                <label>Department</label>
                                <select
                                    name="dept_id"
                                    value={formData.dept_id}
                                    onChange={handleChange}
                                    disabled={loading}
                                >
                                    <option value="1">HR</option>
                                    <option value="2">IT</option>
                                    <option value="3">Finance</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Hire Date</label>
                                <input
                                    type="date"
                                    name="hire_date"
                                    value={formData.hire_date}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="btn-primary" disabled={loading}>
                                {loading ? 'Saving...' : isEditing ? 'Update Employee' : 'Add Employee'}
                            </button>
                            {isEditing && (
                                <button type="button" onClick={handleCancelEdit} className="btn-secondary">
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Employee List */}
                <div className="table-card">
                    <div className="table-header">
                        <h2>📋 Employee List ({filteredEmployees.length})</h2>
                        <div className="search-box">
                            <input
                                type="text"
                                placeholder="🔍 Search employees..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Department</th>
                                    <th>Gender</th>
                                    <th>Hire Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="8" style={{ textAlign: 'center' }}>
                                            Loading...
                                        </td>
                                    </tr>
                                ) : filteredEmployees.length === 0 ? (
                                    <tr>
                                        <td colSpan="8" style={{ textAlign: 'center' }}>
                                            No employees found
                                        </td>
                                    </tr>
                                ) : (
                                    filteredEmployees.map((emp) => (
                                        <tr key={emp.emp_id}>
                                            <td>{emp.emp_id}</td>
                                            <td>{emp.emp_name}</td>
                                            <td>{emp.email}</td>
                                            <td>{emp.phone || 'N/A'}</td>
                                            <td>
                                                <span className="dept-badge">
                                                    {emp.dept_name || 'N/A'}
                                                </span>
                                            </td>
                                            <td>{emp.gender}</td>
                                            <td>
                                                {emp.hire_date
                                                    ? new Date(emp.hire_date).toLocaleDateString()
                                                    : 'N/A'}
                                            </td>
                                            <td>
                                                <div className="action-buttons">
                                                    <button
                                                        onClick={() => handleEdit(emp)}
                                                        className="btn-edit"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(emp.emp_id)}
                                                        className="btn-delete"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeManagement;
