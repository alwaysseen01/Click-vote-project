package com.alwaysseen.clickvote.repository;

import com.alwaysseen.clickvote.domain.Survey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SurveyRepository extends JpaRepository<Survey, Long> {
}
