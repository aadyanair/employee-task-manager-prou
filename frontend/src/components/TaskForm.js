import React, { useState, useEffect } from 'react';

const TaskForm = ({ task, employees, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'TO_DO',
    dueDate: '',
    assignedEmployee: ''
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'TO_DO',
        dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
        assignedEmployee: task.assignedEmployee?.id || ''
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prepare the data for submission
    const submitData = {
      ...formData,
      assignedEmployee: formData.assignedEmployee ? { id: parseInt(formData.assignedEmployee) } : null
    };
    
    onSubmit(submitData);
  };

  return (
    <div className="section">
      <h2>{task ? 'Edit Task' : 'Add New Task'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
          />
        </div>
        
        <div className="form-group">
          <label>Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="TO_DO">To Do</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Due Date:</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Assign to Employee:</label>
          <select
            name="assignedEmployee"
            value={formData.assignedEmployee}
            onChange={handleChange}
          >
            <option value="">Unassigned</option>
            {employees.map(employee => (
              <option key={employee.id} value={employee.id}>
                {employee.name} - {employee.department}
              </option>
            ))}
          </select>
        </div>
        
        <button type="submit" className="btn btn-success">
          {task ? 'Update' : 'Create'} Task
        </button>
        {task && (
          <button type="button" className="btn btn-danger" onClick={onCancel}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default TaskForm;