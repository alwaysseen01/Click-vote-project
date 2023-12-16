package com.alwaysseen.clickvote.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;

@Getter
@Entity
@Table(name="user_petition_vote")
public class UserPetitionVote {
    @Id
    @SequenceGenerator(
            name = "userPetitonVoteSequence",
            sequenceName = "userPetitonVoteSequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "userPetitonVoteSequence"
    )
    private Long id;

    @ManyToOne
    @JoinColumn(name="petition_id")
    @JsonBackReference
    private Petition petition;

    @ManyToOne
    @JoinColumn(name="user_id")
    @JsonManagedReference
    private User user;

    public UserPetitionVote(Petition petition, User user) {
        this.petition = petition;
        this.user = user;
    }

    public UserPetitionVote() {

    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setPetition(Petition petition) {
        this.petition = petition;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
