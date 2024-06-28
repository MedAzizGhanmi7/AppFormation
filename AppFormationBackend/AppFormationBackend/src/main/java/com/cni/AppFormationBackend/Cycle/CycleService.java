package com.cni.AppFormationBackend.Cycle;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CycleService {
    private final CycleRepository cycleRepository;

    public Cycle addCycle (Cycle cycle) {
        return cycleRepository.save(cycle);
    }

    public List<Cycle> getAllCycles () {
        return cycleRepository.findAll();
    }

    public Optional<Cycle> getCycle (Long cycleId) {
        return cycleRepository.findById(cycleId);
    }
}
