# Deployment Guide

## Local Development
1. Start Backend: `cd backend && mvn spring-boot:run`
2. Start Frontend: `cd frontend && npm start`
3. Access: http://localhost:3000

## Production Build

### Backend (Spring Boot)
```bash
cd backend
mvn clean package
java -jar target/employee-task-manager-0.0.1-SNAPSHOT.jar