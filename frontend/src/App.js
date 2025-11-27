import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Dashboard from './components/Dashboard';
import TaskFilters from './components/TaskFilters';
import Login from './components/Login';
import './App.css';

const API_BASE = 'http://localhost:8080/api';

function App() {
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [taskFilters, setTaskFilters] = useState({
    status: '',
    assignedTo: '',
    search: ''
  });
  const [user, setUser] = useState(null); // Authentication state

  // Check for existing session on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Load data when user is authenticated
  useEffect(() => {
    if (user) {
      fetchEmployees();
      fetchTasks();
    }
  }, [user]);

  // Authentication function
  const handleLogin = (username) => {
    setUser({ username });
    // Store in localStorage for persistence
    localStorage.setItem('user', JSON.stringify({ username }));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Employee functions
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${API_BASE}/employees`);
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      alert('Error fetching employees: ' + error.message);
    }
  };

  const handleCreateEmployee = async (employeeData) => {
    try {
      const response = await axios.post(`${API_BASE}/employees`, employeeData);
      setEmployees([...employees, response.data]);
    } catch (error) {
      console.error('Error creating employee:', error);
      alert('Error creating employee: ' + (error.response?.data || error.message));
    }
  };

  const handleUpdateEmployee = async (employeeData) => {
    try {
      const response = await axios.put(`${API_BASE}/employees/${editingEmployee.id}`, employeeData);
      setEmployees(employees.map(emp => 
        emp.id === editingEmployee.id ? response.data : emp
      ));
      setEditingEmployee(null);
    } catch (error) {
      console.error('Error updating employee:', error);
      alert('Error updating employee: ' + (error.response?.data || error.message));
    }
  };

  const handleDeleteEmployee = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axios.delete(`${API_BASE}/employees/${id}`);
        setEmployees(employees.filter(emp => emp.id !== id));
        setTasks(tasks.filter(task => task.assignedEmployee?.id !== id));
      } catch (error) {
        console.error('Error deleting employee:', error);
        alert('Error deleting employee: ' + (error.response?.data || error.message));
      }
    }
  };

  // Task functions
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_BASE}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      alert('Error fetching tasks: ' + error.message);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const response = await axios.post(`${API_BASE}/tasks`, taskData);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Error creating task: ' + (error.response?.data || error.message));
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      const response = await axios.put(`${API_BASE}/tasks/${editingTask.id}`, taskData);
      setTasks(tasks.map(task => 
        task.id === editingTask.id ? response.data : task
      ));
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Error updating task: ' + (error.response?.data || error.message));
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`${API_BASE}/tasks/${id}`);
        setTasks(tasks.filter(task => task.id !== id));
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('Error deleting task: ' + (error.response?.data || error.message));
      }
    }
  };

  // Filter tasks
  const getFilteredTasks = () => {
    return tasks.filter(task => {
      const matchesStatus = !taskFilters.status || task.status === taskFilters.status;
      const matchesEmployee = !taskFilters.assignedTo || 
        task.assignedEmployee?.id === parseInt(taskFilters.assignedTo);
      const matchesSearch = !taskFilters.search || 
        task.title.toLowerCase().includes(taskFilters.search.toLowerCase()) ||
        task.description.toLowerCase().includes(taskFilters.search.toLowerCase());
      
      return matchesStatus && matchesEmployee && matchesSearch;
    });
  };

  // If not authenticated, show login page
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <header className="header">
        <div className="container header-content">
          <h1>Employee Task Manager</h1>
          <div className="user-info">
            <span>Welcome, {user.username}!</span>
            <button onClick={handleLogout} className="btn btn-secondary btn-sm">
              Logout
            </button>
          </div>
        </div>
      </header>
      
      <div className="container">
        {/* Navigation Tabs */}
        <div className="tabs">
          <button 
            className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={`tab-btn ${activeTab === 'employees' ? 'active' : ''}`}
            onClick={() => setActiveTab('employees')}
          >
            Employees
          </button>
          <button 
            className={`tab-btn ${activeTab === 'tasks' ? 'active' : ''}`}
            onClick={() => setActiveTab('tasks')}
          >
            Tasks
          </button>
        </div>

        {activeTab === 'dashboard' && (
          <Dashboard employees={employees} tasks={tasks} />
        )}

        {activeTab === 'employees' && (
          <div className="dashboard">
            <div>
              <EmployeeForm
                employee={editingEmployee}
                onSubmit={editingEmployee ? handleUpdateEmployee : handleCreateEmployee}
                onCancel={() => setEditingEmployee(null)}
              />
            </div>
            
            <div>
              <EmployeeList
                employees={employees}
                onEdit={setEditingEmployee}
                onDelete={handleDeleteEmployee}
              />
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div>
            <TaskFilters 
              filters={taskFilters}
              onFilterChange={setTaskFilters}
              employees={employees}
            />
            
            <div className="dashboard">
              <div>
                <TaskForm
                  task={editingTask}
                  employees={employees}
                  onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                  onCancel={() => setEditingTask(null)}
                />
              </div>
              
              <div>
                <TaskList
                  tasks={getFilteredTasks()}
                  onEdit={setEditingTask}
                  onDelete={handleDeleteTask}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;