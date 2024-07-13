package com.cni.AppFormationBackend.Session;

import com.cni.AppFormationBackend.Cycle.Cycle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SessionRepository extends JpaRepository<Session,Long> {

    List<Session> findByFinishedIsFalse();
    int countByCycleAndFinishedIsFalse(Cycle cycle);

}
