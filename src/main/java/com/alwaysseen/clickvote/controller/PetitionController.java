package com.alwaysseen.clickvote.controller;

import com.alwaysseen.clickvote.domain.Petition;
import com.alwaysseen.clickvote.service.PetitionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/petitions")
public class PetitionController {
    @Autowired
    private PetitionService petitionService;

    @GetMapping
    public Iterable<Petition> getAll() {
        return petitionService.getAll();
    }

    @GetMapping("/active")
    public Iterable<Petition> getActive() {
        return petitionService.getActive();
    }

    @GetMapping("/completed")
    public Iterable<Petition> getCompleted() {
        return petitionService.getCompleted();
    }

    @GetMapping("/{petition_id}/hasVotedBy/{user_id}")
    public ResponseEntity<?> hasVoted(@PathVariable Long petition_id, @PathVariable Long user_id) {
        boolean hasVoted = petitionService.hasUserVoted(petition_id, user_id);
        return new ResponseEntity<>(hasVoted, HttpStatus.OK);
    }

    @PostMapping("/{petition_id}/vote/{user_id}")
    public void vote(@PathVariable Long petition_id, @PathVariable Long user_id) {
        boolean hasVoted = petitionService.hasUserVoted(petition_id, user_id);
        if (!hasVoted) {
            petitionService.vote(petition_id, user_id);
        }
    }

    @PostMapping
    public void createElection(@RequestBody Petition election) {
        petitionService.createPetition(election);
    }

    @PutMapping("/{id}")
    public void updateElection(@PathVariable Long id, @RequestBody Petition petition) {
        petitionService.updatePetition(id, petition);
    }
}
