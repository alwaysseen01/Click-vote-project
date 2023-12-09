package com.alwaysseen.clickvote.service;

import com.alwaysseen.clickvote.domain.Petition;
import com.alwaysseen.clickvote.domain.Survey;
import com.alwaysseen.clickvote.repository.PetitionRepository;
import com.alwaysseen.clickvote.repository.SurveyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SurveyService {
    @Autowired
    private SurveyRepository surveyRepository;

    public Iterable<Survey> getAll() {
        return surveyRepository.findAll();
    }

    public List<Survey> getActive() {
        LocalDate currentDate = LocalDate.now();
        List<Survey> allPetitions = surveyRepository.findAll();
        return allPetitions.stream()
                .filter(Survey -> Survey.getStartDate().plusDays(Survey.getDurationDays()).isAfter(currentDate))
                .collect(Collectors.toList());
    }

    public List<Survey> getCompleted() {
        LocalDate currentDate = LocalDate.now();
        List<Survey> allPetitions = surveyRepository.findAll();
        return allPetitions.stream()
                .filter(Survey -> Survey.getStartDate().plusDays(Survey.getDurationDays()).isBefore(currentDate))
                .collect(Collectors.toList());
    }

    public void createSurvey(Survey Petition) {
        surveyRepository.save(Petition);
    }

    public void updateSurvey(Long id, Survey survey) {
        survey.setId(id);
        surveyRepository.save(survey);
    }
}
