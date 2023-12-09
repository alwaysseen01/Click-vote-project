package com.alwaysseen.clickvote.controller;

import com.alwaysseen.clickvote.domain.Election;
import com.alwaysseen.clickvote.service.ElectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping
    public void createElection(@RequestBody Election election) {
        electionService.createElection(election);
    }

    @PutMapping("/{id}")
    public void updateElection(@PathVariable Long id, @RequestBody Election election) {
        electionService.updateElection(id, election);
    }
}

