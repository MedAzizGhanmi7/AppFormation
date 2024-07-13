package com.cni.AppFormationBackend.Cycle;

import com.cni.AppFormationBackend.Session.Session;
import com.cni.AppFormationBackend.Session.SessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CycleService {
    private final CycleRepository cycleRepository;
    private final SessionRepository sessionRepository;
    public Cycle addCycle (Cycle cycle) {
        return cycleRepository.save(cycle);
    }


    public List<Cycle> getAllCycles () {
        return cycleRepository.findAll();
    }

    public List<Cycle> getAllNotFinishedCycles () {
        return cycleRepository.findByFinishedIsFalse();
    }

    public Optional<Cycle> getCycle (Long cycleId) {
        return cycleRepository.findById(cycleId);
    }



    @Transactional
   // @Scheduled(cron = "0 0 0 * * ?") // Executes at midnight every day
    @Scheduled(cron = "0 * * * * ?") // Runs every minute


    public void checkFinishedCycles() {
        LocalDate today = LocalDate.now();

        List<Cycle> cycles = cycleRepository.findByFinishedIsFalse();

        for (Cycle cycle : cycles) {
            LocalDate endDate = cycle.getEndDate();
            if (endDate != null && endDate.isBefore(today)) {
                cycle.setFinished(true);
                cycleRepository.save(cycle);
            }
        }
    }

}
