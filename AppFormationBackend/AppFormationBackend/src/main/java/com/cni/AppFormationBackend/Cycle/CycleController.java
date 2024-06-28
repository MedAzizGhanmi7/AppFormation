package com.cni.AppFormationBackend.Cycle;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@Slf4j
@RequestMapping("cycles")
@RequiredArgsConstructor
@Tag(name = "Cycle")
public class CycleController {
    private  final  CycleService cycleService;

    @PostMapping("/add")
    public ResponseEntity<Cycle> addCycle(@RequestBody Cycle cycle) {
        log.info("Adding new cycle: {}", cycle);
        Cycle createdCycle = cycleService.addCycle(cycle);
        return new ResponseEntity<>(createdCycle, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Cycle>> findAll() {
        List<Cycle> cycles = cycleService.getAllCycles();
        return new ResponseEntity<>(cycles, HttpStatus.OK);
    }

    @GetMapping("/byId/{cycleId}")
    public ResponseEntity<Cycle> findById(@PathVariable("cycleId") Long cycleId) {
        Cycle cycle = cycleService.getCycle(cycleId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cycle not found"));
        return new ResponseEntity<>(cycle, HttpStatus.OK);
    }

}
