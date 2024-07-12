package com.cni.AppFormationBackend.User;

import com.cni.AppFormationBackend.Session.Session;
import com.cni.AppFormationBackend.Session.SessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository ;
    private final TokenRepository tokenRepository ;
    private final SessionRepository sessionRepository ;
    public List<User> findAll(){
        return userRepository.findAll();
    }
    public boolean toggleUserAccount(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        boolean accountStatus = user.isAccountLocked();
        user.setAccountLocked(!accountStatus);
        userRepository.save(user);
        return !accountStatus;
    }

    public void deleteUserById(Long userId) {
        List<Token> tokens = tokenRepository.findAllByUserUserId(userId);
        tokenRepository.deleteAll(tokens);
        userRepository.deleteById(userId);
    }

    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<User> getAllInstructors(Long sessionId) {
        List<User> instructors = userRepository.findAllByRoleNameAndAccountNonLockedAndEnabled("INSTRUCTOR");

        Session session = sessionRepository.findById(sessionId).orElseThrow(() -> new RuntimeException("Session not found"));

        List<User> sessionInstructors = session.getInstructors();

        return instructors.stream()
                .filter(instructor -> !sessionInstructors.contains(instructor))
                .collect(Collectors.toList());
    }



}
