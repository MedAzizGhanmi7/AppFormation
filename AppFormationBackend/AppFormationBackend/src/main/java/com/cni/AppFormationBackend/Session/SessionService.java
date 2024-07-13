package com.cni.AppFormationBackend.Session;

import com.cni.AppFormationBackend.Cycle.Cycle;
import com.cni.AppFormationBackend.Cycle.CycleRepository;
import com.cni.AppFormationBackend.User.User;
import com.cni.AppFormationBackend.User.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
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

    public List<Session> getSessionsByInstructorEmail(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return user.getInstructorSessions();
        } else {
            throw new RuntimeException("User not found with email: " + email);
        }
    }

    public List<Session> getParticipationsByEmail(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return user.getParticipantSessions();
        } else {
            throw new RuntimeException("User not found with email: " + email);
        }
    }


    public Session participateInSession(String participantEmail, Long sessionId) {
        User participant = userRepository.findByEmail(participantEmail)
                .orElseThrow(() -> new RuntimeException("User not found!"));

        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found!"));

        if (!participant.getParticipantSessions().contains(session) &&
                !session.getParticipants().contains(participant)) {
            participant.getParticipantSessions().add(session);
            session.getParticipants().add(participant);
            session.setParticipantCount(session.getParticipantCount() + 1);
            userRepository.save(participant);
            return sessionRepository.save(session);
        }

        return session;
    }


    public Session validateSession(Long sessionId) {
        Optional<Session> sessionOptional = sessionRepository.findById(sessionId);
        if (sessionOptional.isPresent()) {
            Session session = sessionOptional.get();

            if(session.getParticipantCount()>0){
                session.setValidated(true);
                sessionRepository.save(session);
            }

            return session;
        } else {
            throw new RuntimeException("Session not found with id: " + sessionId);
        }
    }

    public void deleteSession(Long sessionId) {
        if (sessionRepository.existsById(sessionId)) {
            sessionRepository.deleteById(sessionId);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Session not found");
        }
    }

    @Transactional
   // @Scheduled(cron = "0 0 0 * * ?")
    @Scheduled(cron = "0 * * * * ?") // Runs every minute

    public void checkFinishedSessions() {
        LocalDate today = LocalDate.now();

        List<Session> sessions = sessionRepository.findByFinishedIsFalse();

        for (Session session : sessions) {
            LocalDate endDate = session.getEndDate();
            if (endDate != null && endDate.isBefore(today)) {
                session.setFinished(true);
                sessionRepository.save(session);
            }
        }}
}
