package com.alwaysseen.clickvote.repository;

import com.alwaysseen.clickvote.domain.Election;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface ElectionRepository extends JpaRepository<Election, Long> {
}




