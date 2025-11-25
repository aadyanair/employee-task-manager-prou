package com.prou.taskmanager.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "Employee Task Manager API is running! Use /api/employees and /api/tasks endpoints.";
    }
}