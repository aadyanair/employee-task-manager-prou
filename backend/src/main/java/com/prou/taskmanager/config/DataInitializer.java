package com.prou.taskmanager.config;

import com.prou.taskmanager.model.Employee;
import com.prou.taskmanager.model.Task;
import com.prou.taskmanager.model.TaskStatus;
import com.prou.taskmanager.repository.EmployeeRepository;
import com.prou.taskmanager.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Override
    public void run(String... args) throws Exception {
        // Clear existing data
        taskRepository.deleteAll();
        employeeRepository.deleteAll();

        // Create sample employees
        Employee emp1 = new Employee("John Doe", "john.doe@company.com", "Engineering");
        Employee emp2 = new Employee("Jane Smith", "jane.smith@company.com", "Marketing");
        Employee emp3 = new Employee("Mike Johnson", "mike.johnson@company.com", "Sales");

        employeeRepository.save(emp1);
        employeeRepository.save(emp2);
        employeeRepository.save(emp3);

        // Create sample tasks
        Task task1 = new Task("Design Homepage", "Create responsive homepage design", TaskStatus.IN_PROGRESS, LocalDate.now().plusDays(7));
        task1.setAssignedEmployee(emp1);

        Task task2 = new Task("API Documentation", "Write API documentation for endpoints", TaskStatus.TO_DO, LocalDate.now().plusDays(14));
        task2.setAssignedEmployee(emp1);

        Task task3 = new Task("Marketing Campaign", "Plan Q1 marketing campaign", TaskStatus.COMPLETED, LocalDate.now().minusDays(2));
        task3.setAssignedEmployee(emp2);

        Task task4 = new Task("Sales Report", "Generate monthly sales report", TaskStatus.TO_DO, LocalDate.now().plusDays(3));
        task4.setAssignedEmployee(emp3);

        taskRepository.save(task1);
        taskRepository.save(task2);
        taskRepository.save(task3);
        taskRepository.save(task4);

        System.out.println("=== Sample data initialized successfully! ===");
        System.out.println("Employees: " + employeeRepository.count());
        System.out.println("Tasks: " + taskRepository.count());
    }
}