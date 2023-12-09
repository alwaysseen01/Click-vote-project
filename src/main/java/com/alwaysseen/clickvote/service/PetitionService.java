package com.alwaysseen.clickvote.service;

import com.alwaysseen.clickvote.domain.Petition;
import com.alwaysseen.clickvote.repository.PetitionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PetitionService {
    @Autowired
    private PetitionRepository petitionRepository;

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

    public void createPetition(Petition Petition) {
        petitionRepository.save(Petition);
    }

    public void updatePetition(Long id, Petition petition) {
        petition.setId(id);
        petitionRepository.save(petition);
    }
}
