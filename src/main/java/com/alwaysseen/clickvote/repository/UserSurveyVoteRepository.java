package com.alwaysseen.clickvote.repository;

import com.alwaysseen.clickvote.domain.UserSurveyVote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserSurveyVoteRepository extends JpaRepository<UserSurveyVote, Long> {
    boolean existsUserElectionVoteBySurveyIdAndUserId(Long survey_id, Long user_id);
}
