package com.example.demo.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "questions")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String text;

    @ElementCollection
    @CollectionTable(name = "question_options",
            joinColumns = @JoinColumn(name = "question_id"))
    @Column(name = "option_text")
    private List<String> options;

    private int correctIndex;
    private String difficulty;

    // Default constructor (required by JPA)
    public Question() {}

    public Question(String text, List<String> options,
                    int correctIndex, String difficulty) {
        this.text = text;
        this.options = options;
        this.correctIndex = correctIndex;
        this.difficulty = difficulty;
    }

    // Getters
    public Long getId() { return id; }
    public String getText() { return text; }
    public List<String> getOptions() { return options; }
    public int getCorrectIndex() { return correctIndex; }
    public String getDifficulty() { return difficulty; }
}