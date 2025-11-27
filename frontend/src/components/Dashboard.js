import React from 'react';

const Dashboard = ({ employees, tasks }) => {
  // Calculate statistics
  const totalEmployees = employees.length;
  const totalTasks = tasks.length;
  
  const completedTasks = tasks.filter(task => task.status === 'COMPLETED').length;
  const inProgressTasks = tasks.filter(task => task.status === 'IN_PROGRESS').length;
  const todoTasks = tasks.filter(task => task.status === 'TO_DO').length;
  
  const completionRate = totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(1) : 0;
  
  // Employees with most tasks
  const employeeTaskCounts = employees.map(employee => {
    const taskCount = tasks.filter(task => task.assignedEmployee?.id === employee.id).length;
    return { ...employee, taskCount };
  }).sort((a, b) => b.taskCount - a.taskCount);

  return (
    <div className="dashboard-stats">
      <h2>Dashboard Overview</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Employees</h3>
          <div className="stat-number">{totalEmployees}</div>
        </div>
        
        <div className="stat-card">
          <h3>Total Tasks</h3>
          <div className="stat-number">{totalTasks}</div>
        </div>
        
        <div className="stat-card">
          <h3>Completion Rate</h3>
          <div className="stat-number">{completionRate}%</div>
        </div>
        
        <div className="stat-card">
          <h3>Tasks by Status</h3>
          <div className="status-breakdown">
            <div className="status-item">
              <span className="status-dot completed"></span>
              Completed: {completedTasks}
            </div>
            <div className="status-item">
              <span className="status-dot in-progress"></span>
              In Progress: {inProgressTasks}
            </div>
            <div className="status-item">
              <span className="status-dot todo"></span>
              To Do: {todoTasks}
            </div>
          </div>
        </div>
      </div>

      {/* Top Employees by Task Count */}
      <div className="top-employees">
        <h3>Top Employees by Task Count</h3>
        {employeeTaskCounts.slice(0, 5).map(employee => (
          <div key={employee.id} className="employee-stat">
            <span className="employee-name">{employee.name}</span>
            <span className="task-count">{employee.taskCount} tasks</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;