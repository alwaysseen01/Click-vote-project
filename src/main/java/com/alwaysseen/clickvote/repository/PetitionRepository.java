package com.alwaysseen.clickvote.repository;

import com.alwaysseen.clickvote.domain.Petition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PetitionRepository extends JpaRepository<Petition, Long> {
}
