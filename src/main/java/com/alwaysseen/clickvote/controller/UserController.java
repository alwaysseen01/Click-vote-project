package com.alwaysseen.clickvote.controller;

import com.alwaysseen.clickvote.domain.User;
import com.alwaysseen.clickvote.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path="/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping
    public void createUser(@RequestBody User user) throws Exception {
        userService.saveUser(user);
    }
}
