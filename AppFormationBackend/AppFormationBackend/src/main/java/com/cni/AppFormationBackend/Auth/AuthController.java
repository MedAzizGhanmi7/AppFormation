package com.cni.AppFormationBackend.Auth;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.core.Authentication;
import io.swagger.v3.oas.annotations.Parameter;

@RestController
@RequestMapping("auth")
@RequiredArgsConstructor
@Tag(name = "Authentication")
public class AuthController {
    private final AuthService authService ;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<?> register(
            @RequestBody @Valid RegistrationRequest request
    ) throws MessagingException {
        authService.register(request);
        return ResponseEntity.accepted().build();
    }

    @PostMapping("/registerAdmin")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<?> registerAdmin(
            @RequestBody @Valid RegistrationRequest request
    ) throws MessagingException {
        authService.registerAdmin(request);
        return ResponseEntity.accepted().build();
    }
    @PostMapping("/registerParticipant")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<?> registerParticipant(
            @RequestBody @Valid RegistrationRequest request
    ) throws MessagingException {
        authService.registerParticipant(request);
        return ResponseEntity.accepted().build();
    }

    @PostMapping("/registerInstructor")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<?> registerInstructor(
            @RequestBody @Valid RegistrationRequest request
    ) throws MessagingException {
        authService.registerInstructor(request);
        return ResponseEntity.accepted().build();
    }
    @PostMapping(value = "/uploadFile/{email}", consumes = "multipart/form-data")
    public ResponseEntity<?> uploadFile(
            @Parameter()
            @RequestPart("file") MultipartFile file,
            @PathVariable("email") String connectedUserEmail
    ) {
        authService.uploadFile(file, connectedUserEmail);
        return ResponseEntity.accepted().build();
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody @Valid AuthenticationRequest request
    ) {


        return ResponseEntity.ok(authService.authenticate(request));
    }

    @GetMapping("/activate-account")
    public void confirm(
            @RequestParam String token
    ) throws MessagingException {
        authService.activateAccount(token);
    }

    @PostMapping("/logout")
    public void logout() {
        SecurityContextHolder.clearContext();
    }
}
