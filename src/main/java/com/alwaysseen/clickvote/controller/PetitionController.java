package com.alwaysseen.clickvote.controller;

import com.alwaysseen.clickvote.domain.Petition;
import com.alwaysseen.clickvote.service.PetitionService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @PostMapping
    public void createElection(@RequestBody Petition election) {
        petitionService.createPetition(election);
    }

    @PutMapping("/{id}")
    public void updateElection(@PathVariable Long id, @RequestBody Petition petition) {
        petitionService.updatePetition(id, petition);
    }
}
