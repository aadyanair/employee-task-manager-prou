import React from 'react';

const EmployeeList = ({ employees, onEdit, onDelete }) => {
  return (
    <div className="section">
      <h2>Employees</h2>
      {employees.map(employee => (
        <div key={employee.id} className="list-item">
          <h3>{employee.name}</h3>
          <p>Email: {employee.email}</p>
          <p>Department: {employee.department}</p>
          <div className="actions">
            <button 
              className="btn btn-primary"
              onClick={() => onEdit(employee)}
            >
              Edit
            </button>
            <button 
              className="btn btn-danger"
              onClick={() => onDelete(employee.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmployeeList;