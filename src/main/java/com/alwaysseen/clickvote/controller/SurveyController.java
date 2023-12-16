package com.alwaysseen.clickvote.controller;

import com.alwaysseen.clickvote.domain.Survey;
import com.alwaysseen.clickvote.domain.SurveyOption;
import com.alwaysseen.clickvote.service.SurveyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/{id}/winner")
    public ResponseEntity<SurveyOption> getWinner(@PathVariable Long id) {
        Survey survey = surveyService.getSurvey(id);
        if (survey == null) {
            return ResponseEntity.notFound().build();
        }
        try {
            SurveyOption winner = surveyService.findWinner(survey);
            return ResponseEntity.ok(winner);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/{survey_id}/hasVotedBy/{user_id}")
    public ResponseEntity<?> hasVoted(@PathVariable Long survey_id, @PathVariable Long user_id) {
        boolean hasVoted = surveyService.hasUserVoted(survey_id, user_id);
        return new ResponseEntity<>(hasVoted, HttpStatus.OK);
    }

    @PostMapping("/{survey_id}/vote/{option_id}/{user_id}")
    public void vote(@PathVariable Long survey_id, @PathVariable Long option_id, @PathVariable Long user_id) {
        boolean hasVoted = surveyService.hasUserVoted(survey_id, user_id);
        if (!hasVoted) {
            surveyService.vote(survey_id, option_id, user_id);
        }
    }

    @PostMapping
    public void createSurvey(@RequestBody Survey survey) {
        surveyService.createSurvey(survey);
    }

    @PutMapping("/{id}")
    public void updateElection(@PathVariable Long id, @RequestBody Survey survey) {
        surveyService.updateSurvey(id, survey);
    }
}
