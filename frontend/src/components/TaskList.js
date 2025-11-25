import React from 'react';

const TaskList = ({ tasks, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED': return '#27ae60';
      case 'IN_PROGRESS': return '#3498db';
      case 'TO_DO': return '#e74c3c';
      default: return '#666';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'COMPLETED': return 'Completed';
      case 'IN_PROGRESS': return 'In Progress';
      case 'TO_DO': return 'To Do';
      default: return status;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="section">
      <h2>Tasks ({tasks.length})</h2>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        tasks.map(task => (
          <div key={task.id} className="list-item">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <h3>{task.title}</h3>
                <p style={{ marginBottom: '0.5rem', color: '#666' }}>{task.description}</p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <span style={{ 
                    backgroundColor: getStatusColor(task.status),
                    color: 'white',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}>
                    {getStatusText(task.status)}
                  </span>
                  <span>
                    <strong>Due:</strong> {formatDate(task.dueDate)}
                  </span>
                  <span>
                    <strong>Assigned to:</strong> {task.assignedEmployee?.name || 'Unassigned'}
                  </span>
                </div>
              </div>
              <div className="actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => onEdit(task)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={() => onDelete(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;