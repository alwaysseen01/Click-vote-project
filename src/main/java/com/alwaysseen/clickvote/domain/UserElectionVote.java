package com.alwaysseen.clickvote.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;

@Getter
@Entity
@Table(name="user_election_vote")
public class UserElectionVote {
    @Id
    @SequenceGenerator(
            name = "userElectionVoteSequence",
            sequenceName = "userElectionVoteSequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "userElectionVoteSequence"
    )
    private Long id;

    @ManyToOne
    @JoinColumn(name="election_id")
    @JsonBackReference
    private Election election;

    @ManyToOne
    @JoinColumn(name="user_id")
    @JsonManagedReference
    private User user;

    public UserElectionVote(Election election, User user) {
        this.election = election;
        this.user = user;
    }

    public UserElectionVote() {

    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setElection(Election election) {
        this.election = election;
    }

    public void setUser(User user) {
        this.user = user;
    }
}

