package com.alwaysseen.clickvote.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table
public class Election {
    @Id
    @SequenceGenerator(
            name = "electionSequence",
            sequenceName = "electionSequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "electionSequence"
    )
    private Long id;

    private String title;
    private LocalDate startDate;

    private Integer durationDays; // Duration is expected to be receives as days. Example: received 10 --> 10 days of duration

    @OneToMany(mappedBy="election")
    @JsonManagedReference
    private List<ElectionOption> options;

    public Election(Long id, String title, LocalDate startDate, Integer durationDays, List<ElectionOption> options) {
        this.id = id;
        this.title = title;
        this.startDate = startDate;
        this.durationDays = durationDays;
        this.options = options;
    }

    public Election(String title, LocalDate startDate, Integer durationDays, List<ElectionOption> options) {
        this.title = title;
        this.startDate = startDate;
        this.durationDays = durationDays;
        this.options = options;
    }

    public Election() {
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

    public Integer getDurationDays() {
        return durationDays;
    }

    public void setDurationDays(Integer durationDays) {
        this.durationDays = durationDays;
    }

    public List<ElectionOption> getOptions() {
        return options;
    }

    public void setOptions(List<ElectionOption> options) {
        this.options = options;
    }
}
