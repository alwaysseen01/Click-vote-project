package com.alwaysseen.clickvote.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table
public class SurveyOption {
    @Id
    @SequenceGenerator(
            name = "surveyOptionSequence",
            sequenceName = "surveyOptionSequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "surveyOptionSequence"
    )
    private Long id;

    private String text;

    private Integer votesCount;

    @ManyToOne
    @JoinColumn(name="survey_id", nullable=false)
    @JsonBackReference
    private Survey survey;

    public SurveyOption(Long id, String text, Integer votesCount, Survey survey) {
        this.id = id;
        this.text = text;
        this.votesCount = votesCount;
        this.survey = survey;
    }

    public SurveyOption(String text, Integer votesCount, Survey survey) {
        this.text = text;
        this.votesCount = votesCount;
        this.survey = survey;
    }

    public SurveyOption() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Integer getVotesCount() {
        return votesCount;
    }

    public void setVotesCount(Integer votesCount) {
        this.votesCount = votesCount;
    }

    public Survey getSurvey() {
        return survey;
    }

    public void setSurvey(Survey survey) {
        this.survey = survey;
    }
}
