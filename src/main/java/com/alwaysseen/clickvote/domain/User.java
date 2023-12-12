package com.alwaysseen.clickvote.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="users")
@Getter
@Setter
public class User {
    @Id
    @SequenceGenerator(
            name = "userSequence",
            sequenceName = "userSequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "userSequence"
    )
    private Long id;

    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private Set<Role> roles = new HashSet<>(Arrays.asList(Role.USER));

    public User(Long id, String username, String password, String firstName, String lastName, Set<Role> roles) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.roles = roles;
    }

    public User(String username, String password, String firstName, String lastName, Set<Role> roles) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.roles = roles;
    }

    public User(Long id, String username, String password, String firstName, String lastName) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public User() {
    }
}

