package com.alwaysseen.clickvote.service;

import com.alwaysseen.clickvote.domain.User;
import com.alwaysseen.clickvote.repository.UserRepository;
import jakarta.security.auth.message.AuthException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public User saveUser(User user) throws Exception {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        try {
            return userRepository.save(user);
        } catch (Exception e) {
            throw new Exception("Error while saving a user.");
        }
    }

    public Optional<User> getByUsername(String login) {
        return Optional.ofNullable(userRepository.findByUsername(login));
    }
}
