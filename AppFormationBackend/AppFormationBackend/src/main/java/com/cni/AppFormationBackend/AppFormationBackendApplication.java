package com.cni.AppFormationBackend;

import com.cni.AppFormationBackend.Role.Role;
import com.cni.AppFormationBackend.Role.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableJpaAuditing
@EnableAsync
@EnableScheduling

public class AppFormationBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(AppFormationBackendApplication.class, args);
	}
	@Bean
	public CommandLineRunner runner(RoleRepository roleRepository) {
		return args -> {
			if (roleRepository.findByName("USER").isEmpty()) {
				roleRepository.save(Role.builder().name("USER").build());
			}
			if (roleRepository.findByName("ADMIN").isEmpty()) {
				roleRepository.save(Role.builder().name("ADMIN").build());
			}
			if (roleRepository.findByName("PARTICIPANT").isEmpty()) {
				roleRepository.save(Role.builder().name("PARTICIPANT").build());
			}
			if (roleRepository.findByName("INSTRUCTOR").isEmpty()) {
				roleRepository.save(Role.builder().name("INSTRUCTOR").build());
			}
		};
	}
}
