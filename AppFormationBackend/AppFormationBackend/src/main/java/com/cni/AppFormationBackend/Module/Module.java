package com.cni.AppFormationBackend.Module;

import com.cni.AppFormationBackend.Session.Session;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class Module {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long moduleId ;
    private String moduleName;

    @ManyToMany(fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Session> sessions;
}
