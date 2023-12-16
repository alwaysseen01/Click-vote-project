package com.alwaysseen.clickvote.repository;

import com.alwaysseen.clickvote.domain.UserPetitionVote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserPetitionVoteRepository extends JpaRepository<UserPetitionVote, Long> {
    boolean existsUserPetitionVoteByPetitionIdAndUserId(Long petition_id, Long user_id);
}

