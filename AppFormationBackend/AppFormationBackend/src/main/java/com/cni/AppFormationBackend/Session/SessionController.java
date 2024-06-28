package com.cni.AppFormationBackend.Session;

import com.cni.AppFormationBackend.Cycle.Cycle;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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
}
