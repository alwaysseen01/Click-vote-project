package com.alwaysseen.clickvote.service;

import com.alwaysseen.clickvote.domain.Election;
import com.alwaysseen.clickvote.domain.ElectionOption;
import com.alwaysseen.clickvote.repository.ElectionOptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ElectionOptionService {
    @Autowired
    private ElectionOptionRepository electionOptionRepository;
    public Iterable<ElectionOption> getAll() {
        return electionOptionRepository.findAll();
    }

    public Iterable<ElectionOption> getAllByElectionId(Long electionId) {
        return electionOptionRepository.findAllByElectionId(electionId);
    }

    public void createElectionOption(ElectionOption electionOption) {
        electionOptionRepository.save(electionOption);
    }

    public void updateElectionOption(Long id, ElectionOption electionOption) {
        electionOption.setId(id);
        electionOptionRepository.save(electionOption);
    }
}
