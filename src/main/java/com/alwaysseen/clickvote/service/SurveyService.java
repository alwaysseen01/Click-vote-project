package com.alwaysseen.clickvote.service;

import com.alwaysseen.clickvote.domain.Survey;
import com.alwaysseen.clickvote.domain.SurveyOption;
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

    public Survey getSurvey(Long id) {
        return surveyRepository.findById(id).orElse(null);
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

    public SurveyOption findWinner(Survey survey) {
        LocalDate currentDate = LocalDate.now();
        if (survey.getStartDate().plusDays(survey.getDurationDays()).isAfter(currentDate)) {
            throw new RuntimeException("Survey is not yet completed.");
        }
        List<SurveyOption> options = survey.getOptions();
        SurveyOption winner = options.get(0);
        for (SurveyOption option : options) {
            if (option.getVotesCount() > winner.getVotesCount()) {
                winner = option;
            }
        }
        return winner;
    }

    public void createSurvey(Survey Petition) {
        surveyRepository.save(Petition);
    }

    public void updateSurvey(Long id, Survey survey) {
        survey.setId(id);
        surveyRepository.save(survey);
    }
}
