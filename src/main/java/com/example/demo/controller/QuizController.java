package com.example.demo.controller;

import com.example.demo.model.Question;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
public class QuizController {

    // This makes the questions available at http://localhost:8080/api/questions
    @GetMapping("/api/questions")
    public List<Question> getQuestions() {
        return Arrays.asList(
                new Question("What does HTML stand for?", "HyperText Markup Language"),
                new Question("Which programming language is known as the 'language of the web'?", "JavaScript"),
                new Question("What is the main purpose of CSS?", "Styling"),
                new Question("What does SQL stand for?", "Structured Query Language"),
                new Question("Which Java framework are we currently using?", "Spring Boot"),
                new Question("What is the default port for a Spring Boot application?", "8080"),
                new Question("What does HTTP stand for?", "HyperText Transfer Protocol"),
                new Question("Which symbol is used for ID selectors in CSS?", "#"),
                new Question("In Java, which keyword is used to create a subclass?", "extends"),
                new Question("What is the brain of a computer?", "CPU")
        );
    }
}