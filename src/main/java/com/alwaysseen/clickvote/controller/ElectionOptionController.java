package com.alwaysseen.clickvote.controller;

import com.alwaysseen.clickvote.domain.ElectionOption;
import com.alwaysseen.clickvote.service.ElectionOptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/election_options")
public class ElectionOptionController {
    @Autowired
    private ElectionOptionService electionOptionService;

    @GetMapping
    public Iterable<ElectionOption> getAll() {
        return electionOptionService.getAll();
    }

    @GetMapping("/{id}")
    public Iterable<ElectionOption> getAllAllByElectionId(@PathVariable Long id) {
        return electionOptionService.getAllByElectionId(id);
    }

    @PostMapping
    public void createElectionOption(@RequestBody ElectionOption electionOption) {
        electionOptionService.createElectionOption(electionOption);
    }

    @PutMapping("/{id}")
    public void updateElectionOption(@PathVariable Long id, @RequestBody ElectionOption electionOption) {
        electionOptionService.updateElectionOption(id, electionOption);
    }
}