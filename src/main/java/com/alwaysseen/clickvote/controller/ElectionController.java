package com.alwaysseen.clickvote.controller;

import com.alwaysseen.clickvote.domain.Election;
import com.alwaysseen.clickvote.domain.ElectionOption;
import com.alwaysseen.clickvote.domain.User;
import com.alwaysseen.clickvote.service.ElectionService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/elections")
public class ElectionController {
    @Autowired
    private ElectionService electionService;

    @GetMapping
    public Iterable<Election> getAll() {
        return electionService.getAll();
    }

    @GetMapping("/active")
    public Iterable<Election> getActive() {
        return electionService.getActive();
    }

    @GetMapping("/completed")
    public Iterable<Election> getCompleted() {
        return electionService.getCompleted();
    }

    @GetMapping("/{id}/winner")
    public ResponseEntity<ElectionOption> getWinner(@PathVariable Long id) {
        Election election = electionService.getElection(id);
        if (election == null) {
            return ResponseEntity.notFound().build();
        }
        try {
            ElectionOption winner = electionService.findWinner(election);
            return ResponseEntity.ok(winner);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/{id}/results")
    public ResponseEntity<List<Map<String, Object>>> getElectionResults(@PathVariable Long id) {
        Election election = electionService.getElection(id);
        if (election == null) {
            return ResponseEntity.notFound().build();
        }
        try {
            List<Map<String, Object>> results = electionService.calculatePercentage(election);
            return ResponseEntity.ok(results);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/{election_id}/hasVotedBy/{user_id}")
    public ResponseEntity<?> hasVoted(@PathVariable Long election_id, @PathVariable Long user_id) {
        boolean hasVoted = electionService.hasUserVoted(election_id, user_id);
        return new ResponseEntity<>(hasVoted, HttpStatus.OK);
    }

    @PostMapping("/{election_id}/vote/{option_id}/{user_id}")
    public void vote(@PathVariable Long election_id, @PathVariable Long option_id, @PathVariable Long user_id) {
        boolean hasVoted = electionService.hasUserVoted(election_id, user_id);
        if (!hasVoted) {
            electionService.vote(election_id, option_id, user_id);
        }
    }

    @PostMapping
    public void createElection(@RequestBody Election election) throws Exception {
        electionService.createElection(election);
    }

    @PutMapping("/{id}")
    public void updateElection(@PathVariable Long id, @RequestBody Election election) {
        electionService.updateElection(id, election);
    }
}

