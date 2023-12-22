package com.alwaysseen.clickvote.service;

import com.alwaysseen.clickvote.domain.*;
import com.alwaysseen.clickvote.repository.SurveyRepository;
import com.alwaysseen.clickvote.repository.UserRepository;
import com.alwaysseen.clickvote.repository.UserSurveyVoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class SurveyService {
    @Autowired
    private SurveyRepository surveyRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SurveyOptionService surveyOptionService;
    @Autowired
    private UserSurveyVoteRepository userSurveyVoteRepository;

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
        boolean isTie = false;
        for (SurveyOption option : options) {
            if (option.getVotesCount() > winner.getVotesCount()) {
                winner = option;
                isTie = false;
            } else if (Objects.equals(option.getVotesCount(), winner.getVotesCount())) {
                isTie = true;
            }
        }
        if (isTie) {
            return null;
        }
        return winner;
    }

    public boolean hasUserVoted(Long survey_id, Long user_id) {
        return userSurveyVoteRepository.existsUserElectionVoteBySurveyIdAndUserId(survey_id, user_id);
    }

    public void vote(Long survey_id, Long option_id, Long user_id) {
        Survey survey = surveyRepository.getReferenceById(survey_id);
        User user = userRepository.getReferenceById(user_id);

        UserSurveyVote vote = new UserSurveyVote();
        vote.setSurvey(survey);
        vote.setUser(user);
        userSurveyVoteRepository.save(vote);
        surveyOptionService.addVote(option_id);
    }

    public void createSurvey(Survey Petition) {
        surveyRepository.save(Petition);
    }

    public void updateSurvey(Long id, Survey survey) {
        survey.setId(id);
        surveyRepository.save(survey);
    }
}
