package com.cni.AppFormationBackend.Auth;

import com.cni.AppFormationBackend.Email.EmailService;
import com.cni.AppFormationBackend.Email.EmailTemplateName;
import com.cni.AppFormationBackend.File.FileStorageService;
import com.cni.AppFormationBackend.Role.Role;
import com.cni.AppFormationBackend.Role.RoleRepository;
import com.cni.AppFormationBackend.Security.JwtService;
import com.cni.AppFormationBackend.User.Token;
import com.cni.AppFormationBackend.User.TokenRepository;
import com.cni.AppFormationBackend.User.User;
import com.cni.AppFormationBackend.User.UserRepository;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import org.springframework.security.core.Authentication;
@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository ;
    private  final RoleRepository roleRepository ;
    private final PasswordEncoder passwordEncoder ;
    private final TokenRepository tokenRepository;
    private final EmailService emailService;
    @Value("${activation-url}")
    private String activationUrl;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final FileStorageService fileStorageService;

    public void register(RegistrationRequest request) throws MessagingException {
        var userRole = roleRepository.findByName("USER")
                .orElseThrow(() -> new IllegalStateException("ROLE USER was not initiated"));
        var user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .accountLocked(false)
                .enabled(false)
                .roles(List.of(userRole))
                .build();
        userRepository.save(user);
        sendValidationEmail(user);
    }

    public void registerParticipant(RegistrationRequest request) throws MessagingException {
        List<Role> userRoles = new ArrayList<>();
        userRoles.add(roleRepository.findByName("USER").get());
        userRoles.add(roleRepository.findByName("PARTICIPANT").get());

        var user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .accountLocked(false)
                .enabled(false)
                .roles(userRoles)
                .cin(request.getCin())
                .phoneNumber(request.getPhoneNumber())
                .dateOfBirth(request.getDateOfBirth())
                .build();
        userRepository.save(user);
        sendValidationEmail(user);
    }

    public void registerInstructor(RegistrationRequest request) throws MessagingException {
        List<Role> userRoles = new ArrayList<>();
        userRoles.add(roleRepository.findByName("USER").get());
        userRoles.add(roleRepository.findByName("INSTRUCTOR").get());

        var user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .accountLocked(false)
                .enabled(false)
                .verified(false)
                .roles(userRoles)
                .cin(request.getCin())
                .phoneNumber(request.getPhoneNumber())
                .dateOfBirth(request.getDateOfBirth())
                .speciality(request.getSpeciality())
                .company(request.getCompany())
                .workplace(request.getWorkplace())
                .build();
        userRepository.save(user);
        sendValidationEmail(user);
    }
    public void uploadFile(MultipartFile file, String connectedUserEmail) {

        User user = userRepository.findByEmail(connectedUserEmail).get();
        var filepath = fileStorageService.saveFile(file, user.getUserId());
        user.setPdfFile(filepath);
        userRepository.save(user);
    }

    private void sendValidationEmail(User user) throws MessagingException {
        var newToken = generateAndSaveActivationToken(user);

        emailService.sendEmail(
                user.getEmail(),
                user.fullName(),
                EmailTemplateName.ACTIVATE_ACCOUNT,
                activationUrl,
                newToken,
                "Account activation"
        );
    }

    private String generateAndSaveActivationToken(User user) {
        // Generate a token
        String generatedToken = generateActivationCode(6);
        var token = Token.builder()
                .token(generatedToken)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusMinutes(15))
                .user(user)
                .build();
        tokenRepository.save(token);

        return generatedToken;
    }

    private String generateActivationCode(int length) {
        String characters = "0123456789";
        StringBuilder codeBuilder = new StringBuilder();

        SecureRandom secureRandom = new SecureRandom();

        for (int i = 0; i < length; i++) {
            int randomIndex = secureRandom.nextInt(characters.length());
            codeBuilder.append(characters.charAt(randomIndex));
        }

        return codeBuilder.toString();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        var auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var claims = new HashMap<String, Object>();
        var user = ((User) auth.getPrincipal());
        claims.put("fullName", user.fullName());
        claims.put("verified", user.isVerified());
        var jwtToken = jwtService.generateToken(claims, (User) auth.getPrincipal());
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

   // @Transactional
    public void activateAccount(String token) throws MessagingException {
        Token savedToken = tokenRepository.findByToken(token)

                .orElseThrow(() -> new RuntimeException("Invalid token"));
        if (LocalDateTime.now().isAfter(savedToken.getExpiresAt())) {
            sendValidationEmail(savedToken.getUser());
            throw new RuntimeException("Activation token has expired. A new token has been send to the same email address");
        }

        var user = userRepository.findById(savedToken.getUser().getUserId())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        user.setEnabled(true);
        userRepository.save(user);

        savedToken.setValidatedAt(LocalDateTime.now());
        tokenRepository.save(savedToken);
    }
}
