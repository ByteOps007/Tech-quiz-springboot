package com.example.demo;

import com.example.demo.model.Question;
import com.example.demo.repository.QuestionRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataSeeder implements CommandLineRunner {

    private final QuestionRepository questionRepository;

    public DataSeeder(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    @Override
    public void run(String... args) {
        // Only seed if DB is empty
        if (questionRepository.count() == 0) {
            questionRepository.saveAll(Arrays.asList(
                    new Question("In Client-Server architecture, which side handles user interface?",
                            Arrays.asList("Server", "Database", "Client", "Middleware"),
                            2, "easy"),
                    new Question("What does WWW stand for?",
                            Arrays.asList("World Wide Web", "World Wide Wire", "Web Wide World", "Wide World Web"),
                            0, "easy"),
                    new Question("Which HTTP method is used to send data to the server?",
                            Arrays.asList("GET", "POST", "DELETE", "FETCH"),
                            1, "easy"),
                    new Question("What is the correct doctype declaration for HTML5?",
                            Arrays.asList("<!DOCTYPE HTML5>", "<!DOCTYPE html>", "<html5>", "<!HTML>"),
                            1, "easy"),
                    new Question("Which HTML5 element is used to draw graphics via JavaScript?",
                            Arrays.asList("<svg>", "<graphics>", "<canvas>", "<draw>"),
                            2, "medium"),
                    new Question("What is the main difference between XHTML and HTML?",
                            Arrays.asList("XHTML uses lowercase tags only", "XHTML is stricter and must be well-formed XML", "XHTML does not support CSS", "XHTML is older than HTML"),
                            1, "medium"),
                    new Question("In XML, what does DTD stand for?",
                            Arrays.asList("Document Type Definition", "Data Type Declaration", "Document Transfer Data", "Dynamic Type Definition"),
                            0, "medium"),
                    new Question("Which type of CSS is written directly inside an HTML element?",
                            Arrays.asList("External", "Internal", "Inline", "Embedded"),
                            2, "easy"),
                    new Question("Which CSS selector targets an element with a specific id?",
                            Arrays.asList(".classname", "#idname", "*", "elementname"),
                            1, "easy"),
                    new Question("In the CSS Box Model, which property creates space outside the border?",
                            Arrays.asList("Padding", "Border", "Margin", "Outline"),
                            2, "medium"),
                    new Question("Which Bootstrap class creates a responsive grid container?",
                            Arrays.asList("container", "wrapper", "grid", "row-fluid"),
                            0, "medium"),
                    new Question("Which JavaScript keyword is used to declare a variable?",
                            Arrays.asList("int", "var", "string", "define"),
                            1, "easy"),
                    new Question("What does DOM stand for in web development?",
                            Arrays.asList("Document Object Model", "Data Object Management", "Dynamic Object Model", "Document Oriented Model"),
                            0, "easy"),
                    new Question("Which CSS property is used to add animation to an element?",
                            Arrays.asList("transition", "transform", "animation", "keyframe"),
                            2, "medium"),
                    new Question("In Bootstrap grid system, how many columns does a row have by default?",
                            Arrays.asList("8", "10", "12", "16"),
                            2, "medium")
            ));
            System.out.println("✅ 15 questions seeded into H2 database!");
        }
    }
}