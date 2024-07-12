package com.cni.AppFormationBackend.Session;

import com.cni.AppFormationBackend.Cycle.Cycle;
import com.cni.AppFormationBackend.Module.Module;
import com.cni.AppFormationBackend.User.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class Session {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long sessionId;
    private  String sessionName;
    private LocalDate startDate;
    private LocalDate endDate;
    private int participantCount;
    private boolean finished = false;
    private boolean validated = false;
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private Cycle cycle;

    @ManyToMany(mappedBy = "instructorSessions", fetch = FetchType.LAZY)
    private List<User> instructors;

    @ManyToMany(mappedBy = "participantSessions", fetch = FetchType.LAZY)
    private List<User> participants;

    @ManyToMany(mappedBy = "sessions", fetch = FetchType.LAZY)
    private List<Module> modules;
}
