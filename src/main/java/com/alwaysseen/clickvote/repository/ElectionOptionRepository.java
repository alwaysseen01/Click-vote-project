package com.alwaysseen.clickvote.repository;

import com.alwaysseen.clickvote.domain.ElectionOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ElectionOptionRepository extends JpaRepository<ElectionOption, Long> {
    @Query("SELECT ep FROM ElectionOption ep WHERE ep.election.id = :electionId")
    Iterable<ElectionOption> findAllByElectionId(@Param("electionId") Long electionId);
}

