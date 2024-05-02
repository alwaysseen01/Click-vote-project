package com.alwaysseen.clickvote.controller;

import com.alwaysseen.clickvote.domain.User;
import com.alwaysseen.clickvote.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(path="/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping(path = "/{username}")
    public Optional<User> getUser(@PathVariable String username) {
        return userService.getByUsername(username);
    }

    @PostMapping(path="/")
    public void createUser(@RequestBody User user) throws Exception {
        userService.saveUser(user);
    }
}
