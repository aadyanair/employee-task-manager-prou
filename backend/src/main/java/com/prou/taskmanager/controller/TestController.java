package com.prou.taskmanager.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/test")
    public String test() {
        return "Test API is working!";
    }
    
    @GetMapping("/api/test")
    public String apiTest() {
        return "API Test is working!";
    }
}