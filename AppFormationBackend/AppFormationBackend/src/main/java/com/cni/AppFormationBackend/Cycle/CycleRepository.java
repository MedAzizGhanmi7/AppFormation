package com.cni.AppFormationBackend.Cycle;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CycleRepository  extends JpaRepository<Cycle, Long> {

    List<Cycle> findByFinishedIsFalse();
}
