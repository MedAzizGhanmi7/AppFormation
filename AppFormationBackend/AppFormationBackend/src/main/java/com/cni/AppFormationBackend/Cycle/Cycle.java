package com.cni.AppFormationBackend.Cycle;

import com.cni.AppFormationBackend.Session.Session;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class Cycle {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long cycleId ;
    private  String cycleName;
    private LocalDate startDate;
    private LocalDate endDate;

    @OneToMany(mappedBy = "cycle", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Session> sessions;
}
