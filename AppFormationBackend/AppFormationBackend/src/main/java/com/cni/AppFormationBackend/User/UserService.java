package com.cni.AppFormationBackend.User;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository ;
    private final TokenRepository tokenRepository ;

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


}
