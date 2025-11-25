package com.prou.taskmanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.prou.taskmanager")
public class EmployeeTaskManagerApplication {

    public static void main(String[] args) {
        SpringApplication.run(EmployeeTaskManagerApplication.class, args);
    }
}