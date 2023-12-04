package com.alwaysseen.clickvote.domain;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table
public class Survey {
    @Id
    @SequenceGenerator(
            name = "petitionSequence",
            sequenceName = "petitionSequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "petitionSequence"
    )
    private Long id;

    private String title;
    private LocalDate startDate;
    private Integer duration;

    @OneToMany(mappedBy="survey")
    private List<SurveyOption> options;

    public Survey(Long id, String title, LocalDate startDate, Integer duration, List<SurveyOption> options) {
        this.id = id;
        this.title = title;
        this.startDate = startDate;
        this.duration = duration;
        this.options = options;
    }

    public Survey(String title, LocalDate startDate, Integer duration, List<SurveyOption> options) {
        this.title = title;
        this.startDate = startDate;
        this.duration = duration;
        this.options = options;
    }

    public Survey() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public List<SurveyOption> getOptions() {
        return options;
    }

    public void setOptions(List<SurveyOption> options) {
        this.options = options;
    }
}
