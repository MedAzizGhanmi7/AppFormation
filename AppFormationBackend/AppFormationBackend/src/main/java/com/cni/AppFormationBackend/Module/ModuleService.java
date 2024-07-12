package com.cni.AppFormationBackend.Module;

import com.cni.AppFormationBackend.Session.Session;
import com.cni.AppFormationBackend.Session.SessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class ModuleService {
    private final ModuleRepository moduleRepository;
    private final SessionRepository sessionRepository;


    public Module createModuleAndSetSession(Module module, Long sessionId) {
        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new IllegalArgumentException("Session not found"));

        if (module.getSessions() == null) {
            module.setSessions(new ArrayList<>());
        }

        module.getSessions().add(session);

        Module savedModule = moduleRepository.save(module);

        if (session.getModules() == null) {
            session.setModules(new ArrayList<>());
        }

        session.getModules().add(savedModule);

        sessionRepository.save(session);

        return savedModule;
    }
}
