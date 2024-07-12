package com.cni.AppFormationBackend.Module;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("modules")
@RequiredArgsConstructor
@Tag(name = "Module")
public class ModuleController {
    private final ModuleService moduleService;
    @PostMapping("/{sessionId}")
    public ResponseEntity<Module> createModuleAndSetSession(
            @RequestBody Module module,
            @PathVariable Long sessionId) {
        try {
            Module createdModule = moduleService.createModuleAndSetSession(module, sessionId);
            return ResponseEntity.ok(createdModule);
        } catch (IllegalArgumentException e) {
            log.error("Error creating module and associating with session: {}", e.getMessage());
            return ResponseEntity.badRequest().body(null);
        } catch (Exception e) {
            log.error("Unexpected error: {}", e.getMessage());
            return ResponseEntity.status(500).body(null);
        }
    }
}
