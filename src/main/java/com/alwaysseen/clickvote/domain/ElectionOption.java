package com.alwaysseen.clickvote.domain;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table
public class ElectionOption {
    @Id
    @SequenceGenerator(
            name = "electionOptionSequence",
            sequenceName = "electionOptionSequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "electionOptionSequence"
    )
    private Long id;

    private String firstName;
    private String lastName;
    private String middleName;
    private LocalDate dateOfBirth;
    private String address;
    private String position;
    private String shortDescription;
    private String longDescription;
    private String photoUrl; // Photo URL of the election candidate

    private Integer votesCount;

    @ManyToOne
    @JoinColumn(name="election_id", nullable=false)
    private Election election;

    public ElectionOption(Long id, String firstName, String lastName, String middleName, LocalDate dateOfBirth, String address, String position, String shortDescription, String longDescription, String photoUrl, Integer votesCount, Election election) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
        this.dateOfBirth = dateOfBirth;
        this.address = address;
        this.position = position;
        this.shortDescription = shortDescription;
        this.longDescription = longDescription;
        this.photoUrl = photoUrl;
        this.votesCount = votesCount;
        this.election = election;
    }

    public ElectionOption(String firstName, String lastName, String middleName, LocalDate dateOfBirth, String address, String position, String shortDescription, String longDescription, String photoUrl, Integer votesCount, Election election) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
        this.dateOfBirth = dateOfBirth;
        this.address = address;
        this.position = position;
        this.shortDescription = shortDescription;
        this.longDescription = longDescription;
        this.photoUrl = photoUrl;
        this.votesCount = votesCount;
        this.election = election;
    }

    public ElectionOption() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
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

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public Integer getVotesCount() {
        return votesCount;
    }

    public void setVotesCount(Integer votesCount) {
        this.votesCount = votesCount;
    }

    public Election getElection() {
        return election;
    }

    public void setElection(Election election) {
        this.election = election;
    }
}
