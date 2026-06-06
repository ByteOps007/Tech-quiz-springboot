package com.example.demo.controller;

import com.example.demo.model.Question;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class QuizController {

    @GetMapping("/api/questions")
    public List<Question> getQuestions() {
        return Arrays.asList(
                new Question("What does HTML stand for?",
                        Arrays.asList("Hyper Text Markup Language", "High Transfer Machine Language",
                                "Hyper Tool Multi Language", "Home Tool Markup Language"),
                        0, "easy"),

                new Question("Which language is known as the 'language of the web'?",
                        Arrays.asList("Python", "Java", "JavaScript", "C++"),
                        2, "easy"),

                new Question("What is the main purpose of CSS?",
                        Arrays.asList("Database management", "Styling and layout of web pages",
                                "Server-side logic", "API communication"),
                        1, "easy"),

                new Question("What does SQL stand for?",
                        Arrays.asList("Structured Query Language", "Simple Queue Logic",
                                "Sequential Queue Language", "Standard Query Link"),
                        0, "medium"),

                new Question("Which Java framework are we using?",
                        Arrays.asList("Hibernate", "Struts", "Spring Boot", "Micronaut"),
                        2, "hard"),

                new Question("What is the default port for Spring Boot?",
                        Arrays.asList("3000", "8000", "8080", "9090"),
                        2, "easy"),

                new Question("What does HTTP stand for?",
                        Arrays.asList("HyperText Transfer Protocol", "High Text Transfer Process",
                                "Hyper Transfer Text Procedure", "Home Text Transfer Protocol"),
                        0, "easy"),

                new Question("Which symbol is used for ID selectors in CSS?",
                        Arrays.asList(".", "#", "*", "@"),
                        1, "medium"),

                new Question("In Java, which keyword creates a subclass?",
                        Arrays.asList("implements", "super", "extends", "inherits"),
                        2, "medium"),

                new Question("What is the brain of a computer called?",
                        Arrays.asList("RAM", "GPU", "CPU", "SSD"),
                        2, "easy")
        );
    }
}