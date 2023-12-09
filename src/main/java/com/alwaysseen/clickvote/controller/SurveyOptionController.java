package com.alwaysseen.clickvote.controller;

import com.alwaysseen.clickvote.domain.ElectionOption;
import com.alwaysseen.clickvote.domain.SurveyOption;
import com.alwaysseen.clickvote.service.ElectionOptionService;
import com.alwaysseen.clickvote.service.SurveyOptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/survey_options")
public class SurveyOptionController {
    @Autowired
    private SurveyOptionService surveyOptionService;

    @GetMapping
    public Iterable<SurveyOption> getAll() {
        return surveyOptionService.getAll();
    }

    @GetMapping("/{id}")
    public Iterable<SurveyOption> getAllBySurveyId(@PathVariable Long id) {
        return surveyOptionService.getAllBySurveyId(id);
    }

    @PostMapping
    public void createSurveyOption(@RequestBody SurveyOption surveyOption) {
        surveyOptionService.createSurveyOption(surveyOption);
    }

    @PutMapping("/{id}")
    public void updateSurveyOption(@PathVariable Long id, @RequestBody SurveyOption surveyOption) {
        surveyOptionService.updateSurveyOption(id, surveyOption);
    }
}
