package com.alwaysseen.clickvote.service;

import com.alwaysseen.clickvote.domain.*;
import com.alwaysseen.clickvote.repository.PetitionRepository;
import com.alwaysseen.clickvote.repository.UserPetitionVoteRepository;
import com.alwaysseen.clickvote.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PetitionService {
    @Autowired
    private PetitionRepository petitionRepository;
    @Autowired
    private UserPetitionVoteRepository userPetitionVoteRepository;
    @Autowired
    private UserRepository userRepository;

    public Iterable<Petition> getAll() {
        return petitionRepository.findAll();
    }

    public List<Petition> getActive() {
        LocalDate currentDate = LocalDate.now();
        List<Petition> allPetitions = petitionRepository.findAll();
        return allPetitions.stream()
                .filter(Petition -> Petition.getStartDate().plusDays(Petition.getDurationDays()).isAfter(currentDate))
                .collect(Collectors.toList());
    }

    public List<Petition> getCompleted() {
        LocalDate currentDate = LocalDate.now();
        List<Petition> allPetitions = petitionRepository.findAll();
        return allPetitions.stream()
                .filter(Petition -> Petition.getStartDate().plusDays(Petition.getDurationDays()).isBefore(currentDate))
                .collect(Collectors.toList());
    }

    public boolean hasUserVoted(Long petition_id, Long user_id) {
        return userPetitionVoteRepository.existsUserPetitionVoteByPetitionIdAndUserId(petition_id, user_id);
    }

    public void vote(Long petition_id, Long user_id) {
        Petition petition = petitionRepository.getReferenceById(petition_id);
        User user = userRepository.getReferenceById(user_id);

        UserPetitionVote vote = new UserPetitionVote();
        vote.setPetition(petition);
        vote.setUser(user);
        userPetitionVoteRepository.save(vote);
        petition.setVotesCount(petition.getVotesCount() + 1);
        petitionRepository.save(petition);
    }

    public void createPetition(Petition Petition) {
        petitionRepository.save(Petition);
    }

    public void updatePetition(Long id, Petition petition) {
        petition.setId(id);
        petitionRepository.save(petition);
    }
}
