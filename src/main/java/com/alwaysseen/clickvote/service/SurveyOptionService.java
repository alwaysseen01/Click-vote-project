package com.alwaysseen.clickvote.service;

import com.alwaysseen.clickvote.domain.ElectionOption;
import com.alwaysseen.clickvote.domain.SurveyOption;
import com.alwaysseen.clickvote.repository.ElectionOptionRepository;
import com.alwaysseen.clickvote.repository.SurveyOptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SurveyOptionService {
    @Autowired
    private SurveyOptionRepository surveyOptionRepository;
    public Iterable<SurveyOption> getAll() {
        return surveyOptionRepository.findAll();
    }

    public Iterable<SurveyOption> getAllBySurveyId(Long surveyId) {
        return surveyOptionRepository.findAllBySurveyId(surveyId);
    }

    public void createSurveyOption(SurveyOption surveyOption) {
        surveyOptionRepository.save(surveyOption);
    }

    public void updateSurveyOption(Long id, SurveyOption surveyOption) {
        surveyOption.setId(id);
        surveyOptionRepository.save(surveyOption);
    }
}
