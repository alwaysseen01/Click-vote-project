package com.alwaysseen.clickvote.domain;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table
public class Petition {
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
    private String shortDescription;
    private String longDescription;
    private LocalDate startDate;
    private Integer duration;

    private Integer votesCount;

    private boolean status;

    public Petition(Long id, String title, String shortDescription, String longDescription, LocalDate startDate, Integer duration, Integer votesCount, boolean status) {
        this.id = id;
        this.title = title;
        this.shortDescription = shortDescription;
        this.longDescription = longDescription;
        this.startDate = startDate;
        this.duration = duration;
        this.votesCount = votesCount;
        this.status = status;
    }

    public Petition(String title, String shortDescription, String longDescription, LocalDate startDate, Integer duration, Integer votesCount, boolean status) {
        this.title = title;
        this.shortDescription = shortDescription;
        this.longDescription = longDescription;
        this.startDate = startDate;
        this.duration = duration;
        this.votesCount = votesCount;
        this.status = status;
    }

    public Petition() {
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

    public String getShortDescription() {
        return shortDescription;
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }

    public String getLongDescription() {
        return longDescription;
    }

    public void setLongDescription(String longDescription) {
        this.longDescription = longDescription;
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

    public Integer getVotesCount() {
        return votesCount;
    }

    public void setVotesCount(Integer votesCount) {
        this.votesCount = votesCount;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }
}
