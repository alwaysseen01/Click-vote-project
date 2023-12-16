package com.alwaysseen.clickvote.repository;

import com.alwaysseen.clickvote.domain.UserElectionVote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserElectionVoteRepository extends JpaRepository<UserElectionVote, Long> {
    boolean existsUserElectionVoteByElectionIdAndUserId(Long election_id, Long user_id);
}
