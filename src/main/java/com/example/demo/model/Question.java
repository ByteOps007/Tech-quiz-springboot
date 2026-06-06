package com.example.demo.model;

public class Question {
    private String text;
    private String answer;

    public Question(String text, String answer) {
        this.text = text;
        this.answer = answer;
    }

    // These "Getters" allow Spring to turn your Java object into JSON for the web
    public String getText() { return text; }
    public String getAnswer() { return answer; }
}