package com.alwaysseen.clickvote.controller;

import com.alwaysseen.clickvote.domain.Survey;
import com.alwaysseen.clickvote.service.SurveyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/surveys")
public class SurveyController {
    @Autowired
    private SurveyService surveyService;

    @GetMapping
    public Iterable<Survey> getAll() {
        return surveyService.getAll();
    }

    @GetMapping("/active")
    public Iterable<Survey> getActive() {
        return surveyService.getActive();
    }

    @GetMapping("/completed")
    public Iterable<Survey> getCompleted() {
        return surveyService.getCompleted();
    }

    @PostMapping
    public void createSurvey(@RequestBody Survey election) {
        surveyService.createSurvey(election);
    }

    @PutMapping("/{id}")
    public void updateElection(@PathVariable Long id, @RequestBody Survey survey) {
        surveyService.updateSurvey(id, survey);
    }
}
