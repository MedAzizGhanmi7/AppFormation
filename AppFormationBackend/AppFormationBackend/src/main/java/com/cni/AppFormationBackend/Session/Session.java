package com.cni.AppFormationBackend.Session;

import com.cni.AppFormationBackend.Cycle.Cycle;
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
    private Long sessionId ;
    private  String sessionName;
    private LocalDate startDate;
    private LocalDate endDate;
    private int participantCount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private Cycle cycle;

    @ManyToMany(mappedBy = "instructorSessions", fetch = FetchType.LAZY)
    private List<User> instructors;
}
