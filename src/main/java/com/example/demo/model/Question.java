package com.example.demo.model;

import java.util.List;

public class Question {
    private String text;
    private List<String> options;
    private int correctIndex;
    private String difficulty;

    public Question(String text, List<String> options, int correctIndex, String difficulty) {
        this.text = text;
        this.options = options;
        this.correctIndex = correctIndex;
        this.difficulty = difficulty;
    }

    public String getText() { return text; }
    public List<String> getOptions() { return options; }
    public int getCorrectIndex() { return correctIndex; }
    public String getDifficulty() { return difficulty; }
}