package com.alwaysseen.clickvote.service;

import com.alwaysseen.clickvote.domain.Election;
import com.alwaysseen.clickvote.repository.ElectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ElectionService {
    @Autowired
    private ElectionRepository electionRepository;

    public Iterable<Election> getAll() {
        return electionRepository.findAll();
    }

    public List<Election> getActive() {
        LocalDate currentDate = LocalDate.now();
        List<Election> allElections = electionRepository.findAll();
        return allElections.stream()
                .filter(election -> election.getStartDate().plusDays(election.getDurationDays()).isAfter(currentDate))
                .collect(Collectors.toList());
    }

    public List<Election> getCompleted() {
        LocalDate currentDate = LocalDate.now();
        List<Election> allElections = electionRepository.findAll();
        return allElections.stream()
                .filter(election -> election.getStartDate().plusDays(election.getDurationDays()).isBefore(currentDate))
                .collect(Collectors.toList());
    }

    public void createElection(Election election) {
        electionRepository.save(election);
    }

    public void updateElection(Long id, Election election) {
        election.setId(id);
        electionRepository.save(election);
    }
}

