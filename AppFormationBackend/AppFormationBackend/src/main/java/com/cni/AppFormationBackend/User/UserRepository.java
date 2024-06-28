package com.cni.AppFormationBackend.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface UserRepository  extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    @Query("SELECT u FROM User u JOIN u.roles r WHERE r.name = :roleName AND u.accountLocked = false AND u.enabled = true")
    List<User> findAllByRoleNameAndAccountNonLockedAndEnabled(@Param("roleName") String roleName);
}


