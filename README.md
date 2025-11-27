# Employee Task Manager - ProU Technology Assessment

A full-stack web application for managing employees and their tasks, built with React frontend and Spring Boot backend.

## 🚀 Tech Stack

- **Frontend**: React, Axios, CSS3
- **Backend**: Spring Boot, Java 21
- **Database**: H2 (Development)
- **Build Tools**: Maven, npm

## 📋 Features

### Core Features
- **Employee Management**: Full CRUD operations for employees
- **Task Management**: Full CRUD operations for tasks
- **Task Assignment**: Assign tasks to specific employees
- **Status Tracking**: Track task progress (To Do, In Progress, Completed)

### Advanced Features
- **Dashboard**: Statistics and overview with completion rates
- **Task Filtering**: Filter by status, assigned employee, and search
- **Authentication**: Simple login system
- **Responsive Design**: Clean and modern UI

## 🎯 Bonus Features Implemented

✅ **Dashboard with Statistics** - Overview with completion rates and employee rankings  
✅ **Task Filtering and Search** - Filter by status, employee, and search tasks  
✅ **Deployment Preparation** - Production-ready configuration  
✅ **Authentication** - Simple login system  
✅ **RESTful API** - Well-structured backend API  


## 🎥 Screen Recording

[![Demo Video](https://img.youtube.com/vi/YOUR_VIDEO_ID/0.jpg)](https://youtu.be/5xS8bQ6mKRQ)

*Click the image above to watch the application demo video*

## 🏗️ Project Structure
```
employee-task-manager/
├── backend/ # Spring Boot Application
│ ├── src/main/java/com/prou/taskmanager/
│ │ ├── controller/ # REST Controllers
│ │ ├── model/ # JPA Entities
│ │ ├── repository/ # Spring Data JPA
│ │ ├── service/ # Business Logic
│ │ └── config/ # Configuration
│ └── pom.xml
├── frontend/ # React Application
│ ├── src/
│ │ ├── components/ # React Components
│ │ │ ├── Dashboard.js
│ │ │ ├── TaskFilters.js
│ │ │ ├── Login.js
│ │ │ └── ...
│ │ ├── App.js
│ │ └── App.css
│ └── package.json
├── DEPLOYMENT.md
└── README.md
```

## 🛠️ Setup & Installation

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd backend
   ```
   
2. Run with Maven:
``` mvn spring-boot:run```

3. Backend runs on ```http://localhost:8080```



### Frontend Setup

1. Navigate to frontend directory:

```cd frontend```

2. Install dependencies:

```npm install```

3. Start development server:

```npm start```

4. Frontend runs on ```http://localhost:3000```

## 📡 API Endpoints
### Employees
- GET /api/employees - Get all employees

- POST /api/employees - Create new employee

- PUT /api/employees/{id} - Update employee

- DELETE /api/employees/{id} - Delete employee

### Tasks
- GET /api/tasks - Get all tasks

- POST /api/tasks - Create new task

- PUT /api/tasks/{id} - Update task

- DELETE /api/tasks/{id} - Delete task

### 🗃️ Database
- H2 Console: http://localhost:8080/h2-console

- JDBC URL: jdbc:h2:mem:testdb

- Username: sa

- Password: password

### 🎨 Features Demo

#### Dashboard

- Real-time statistics

- Completion rates

- Top employees by task count

- Task status breakdown


#### Task Management

- Advanced filtering by status and assignee

- Search functionality

- Status-based color coding

- Due date tracking

#### Authentication

- Simple login system

- Session persistence

- User-friendly interface

## 🎯 Evaluation Criteria Covered
- ✅ Code readability and structure

- ✅ Design and usability (frontend)

- ✅ API and data model design (backend)

- ✅ Documentation and presentation

- ✅ Full-stack integration


# 👤 Developer
## Aadya Nair
#### ProU Technology Assessment - Track 3 (Full-stack Development)