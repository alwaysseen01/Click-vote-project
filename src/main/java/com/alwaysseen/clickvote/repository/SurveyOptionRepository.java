package com.alwaysseen.clickvote.repository;

import com.alwaysseen.clickvote.domain.ElectionOption;
import com.alwaysseen.clickvote.domain.SurveyOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SurveyOptionRepository extends JpaRepository<SurveyOption, Long> {
    @Query("SELECT s FROM SurveyOption s WHERE s.survey.id = :surveyId")
    Iterable<SurveyOption> findAllBySurveyId(@Param("surveyId") Long surveyId);
}
