package com.alwaysseen.clickvote.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;

@Getter
@Entity
@Table(name="user_survey_vote")
public class UserSurveyVote {
    @Id
    @SequenceGenerator(
            name = "userSurveyVoteSequence",
            sequenceName = "userSurveyVoteSequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "userSurveyVoteSequence"
    )
    private Long id;

    @ManyToOne
    @JoinColumn(name="survey_id")
    @JsonBackReference
    private Survey survey;

    @ManyToOne
    @JoinColumn(name="user_id")
    @JsonManagedReference
    private User user;

    public UserSurveyVote(Survey survey, User user) {
        this.survey = survey;
        this.user = user;
    }

    public UserSurveyVote() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Survey getSurvey() {
        return survey;
    }

    public void setSurvey(Survey survey) {
        this.survey = survey;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
