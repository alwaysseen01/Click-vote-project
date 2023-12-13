package com.alwaysseen.clickvote.service;

import com.alwaysseen.clickvote.domain.Election;
import com.alwaysseen.clickvote.domain.ElectionOption;
import com.alwaysseen.clickvote.repository.ElectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ElectionService {
    @Autowired
    private ElectionRepository electionRepository;

    public Iterable<Election> getAll() {
        return electionRepository.findAll();
    }

    public Election getElection(Long id) {
        return electionRepository.findById(id).orElse(null);
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

    public ElectionOption findWinner(Election election) {
        LocalDate currentDate = LocalDate.now();
        if (election.getStartDate().plusDays(election.getDurationDays()).isAfter(currentDate)) {
            throw new RuntimeException("Election is not yet completed.");
        }
        List<ElectionOption> options = election.getOptions();
        ElectionOption winner = options.get(0);
        boolean isTie = false;
        for (ElectionOption option : options) {
            if (option.getVotesCount() > winner.getVotesCount()) {
                winner = option;
                isTie = false;
            } else if (option.getVotesCount().equals(winner.getVotesCount())) {
                isTie = true;
            }
        }
        if (isTie) {
            return null;
        }
        return winner;
    }

    public List<Map<String, Object>> calculatePercentage(Election election) {
        LocalDate currentDate = LocalDate.now();
        if (election.getStartDate().plusDays(election.getDurationDays()).isAfter(currentDate)) {
            throw new RuntimeException("Election is not yet completed.");
        }
        List<ElectionOption> options = election.getOptions();
        int totalVotes = options.stream().mapToInt(ElectionOption::getVotesCount).sum();

        List<Map<String, Object>> results = new ArrayList<>();
        for (ElectionOption option : options) {
            double percentage = (double) option.getVotesCount() / totalVotes * 100;
            Map<String, Object> result = new HashMap<>();
            result.put("optionId", option.getId());
            result.put("percentage", percentage);
            results.add(result);
        }
        return results;
        // Example output -> [{'1': 51}, {'2': 49}]
    }


    public void createElection(Election election) throws Exception {
        try {
            electionRepository.save(election);
        } catch (Exception e) {
            throw new Exception("Error during saving an election to the DB.");
        }
    }

    public void updateElection(Long id, Election election) {
        election.setId(id);
        electionRepository.save(election);
    }
}

