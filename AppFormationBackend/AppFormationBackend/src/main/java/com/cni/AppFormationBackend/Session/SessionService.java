package com.cni.AppFormationBackend.Session;

import com.cni.AppFormationBackend.Cycle.Cycle;
import com.cni.AppFormationBackend.Cycle.CycleRepository;
import com.cni.AppFormationBackend.User.User;
import com.cni.AppFormationBackend.User.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SessionService {
    private final SessionRepository sessionRepository;
    private final CycleRepository cycleRepository;
    private final UserRepository userRepository;
    public Session addSessionAndSetCycle(Session session, Long cycleId) {
        Cycle cycle = cycleRepository.findById(cycleId)
                .orElseThrow(() -> new RuntimeException("Cycle not found"));

        session.setCycle(cycle);
        Session savedSession = sessionRepository.save(session);

        cycle.getSessions().add(savedSession);
        cycleRepository.save(cycle);

        return savedSession;
    }

    public Optional<Session> getSession(Long sessionId) {
        return sessionRepository.findById(sessionId);
    }

    public Session addInstructorToSession(Long sessionId, Long instructorId) {
        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found"));

        User instructor = userRepository.findById(instructorId)
                .orElseThrow(() -> new RuntimeException("Instructor not found"));

        if (!session.getInstructors().contains(instructor)) {
            session.getInstructors().add(instructor);
        }

        if (!instructor.getInstructorSessions().contains(session)) {
            instructor.getInstructorSessions().add(session);
        }

        sessionRepository.save(session);
        userRepository.save(instructor);

        return session;
    }
}
