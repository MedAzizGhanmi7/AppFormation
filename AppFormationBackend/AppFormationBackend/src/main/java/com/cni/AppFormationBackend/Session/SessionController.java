package com.cni.AppFormationBackend.Session;

import com.cni.AppFormationBackend.Cycle.Cycle;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("sessions")
@RequiredArgsConstructor
@Tag(name = "Session")
public class SessionController {
    private final SessionService sessionService;

    @PostMapping("/add/{cycleId}")
    public ResponseEntity<Session> addSession(@RequestBody Session session, @PathVariable Long cycleId) {
        log.info("Adding new session: {} to cycle: {}", session, cycleId);
        Session createdSession = sessionService.addSessionAndSetCycle(session, cycleId);
        return new ResponseEntity<>(createdSession, HttpStatus.CREATED);
    }


    @GetMapping("/byId/{sessionId}")
    public ResponseEntity<Session> findById(@PathVariable("sessionId") Long sessionId) {
        Session session = sessionService.getSession(sessionId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Session not found"));
        return new ResponseEntity<>(session, HttpStatus.OK);
    }

    @PostMapping("/{sessionId}/addInstructor/{instructorId}")
    public ResponseEntity<Session> addInstructorToSession(@PathVariable Long sessionId, @PathVariable Long instructorId) {
        log.info("Adding instructor: {} to session: {}", instructorId, sessionId);
        Session updatedSession = sessionService.addInstructorToSession(sessionId, instructorId);
        return new ResponseEntity<>(updatedSession, HttpStatus.OK);
    }

    @GetMapping("/instructor/{email}")
    public List<Session> getSessionsByInstructorEmail(@PathVariable String email) {
        return sessionService.getSessionsByInstructorEmail(email);
    }

    @GetMapping("/Participations/{email}")
    public List<Session> getParticipantSessions(@PathVariable String email) {
        return sessionService.getParticipationsByEmail(email);
    }

    @PostMapping("/participate/{sessionId}/{participantEmail}")
    public ResponseEntity<Session> participateInSession(@PathVariable Long sessionId, @PathVariable String participantEmail) {
        log.info("Participant with email: {} is joining session: {}", participantEmail, sessionId);
        Session updatedSession = sessionService.participateInSession(participantEmail, sessionId);
        return new ResponseEntity<>(updatedSession, HttpStatus.OK);
    }

    @PutMapping("/validate/{sessionId}")
    public ResponseEntity<Session> validateSession(@PathVariable Long sessionId) {
        log.info("Validating session with id: {}", sessionId);
        Session validatedSession = sessionService.validateSession(sessionId);
        return new ResponseEntity<>(validatedSession, HttpStatus.OK);
    }
    @DeleteMapping("/{sessionId}")
    public ResponseEntity<Void> deleteSession(@PathVariable Long sessionId) {
        log.info("Deleting session with id: {}", sessionId);
        sessionService.deleteSession(sessionId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
