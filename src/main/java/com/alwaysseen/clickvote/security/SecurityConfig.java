package com.alwaysseen.clickvote.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtFilter jwtFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(
                        authz -> authz
                                .requestMatchers("auth/login", "auth/token", "auth/register", "auth/refresh", "auth/checkToken").permitAll()
                                .requestMatchers(HttpMethod.GET, "/elections/**", "/elections/{election_id}/vote/{option_id}/{user_id}", "/elections/{election_id}/hasVotedBy/{user_id}", "/petitions/**", "/petitions/{petition_id}/hasVotedBy/{user_id}", "/petitions/{petition_id}/vote/{user_id}", "/surveys/**", "/surveys/{survey_id}/hasVotedBy/{user_id}", "/surveys/{survey_id}/vote/{option_id}/{user_id}", "/election_options/**", "/survey_options/**", "/users/**").permitAll()
                                .requestMatchers(HttpMethod.POST, "/elections/**", "/elections/{election_id}/vote/{option_id}/{user_id}", "/elections/{election_id}/hasVotedBy/{user_id}", "/petitions/**", "/petitions/{petition_id}/hasVotedBy/{user_id}", "/petitions/{petition_id}/vote/{user_id}", "/surveys/**", "/surveys/{survey_id}/hasVotedBy/{user_id}", "/surveys/{survey_id}/vote/{option_id}/{user_id}", "/election_options/**", "/survey_options/**", "/users/**").permitAll()
                                .anyRequest().authenticated()
                )
                .addFilterAfter(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

}


