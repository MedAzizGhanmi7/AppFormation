package com.cni.AppFormationBackend.Auth;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Builder
public class RegistrationRequest {
    @NotEmpty(message = "Firstname is mandatory")
    @NotNull(message = "Firstname is mandatory")
    private String firstname;
    @NotEmpty(message = "Lastname is mandatory")
    @NotNull(message = "Lastname is mandatory")
    private String lastname;
    @Email(message = "Email is not well formatted")
    @NotEmpty(message = "Email is mandatory")
    @NotNull(message = "Email is mandatory")
    private String email;
    @NotEmpty(message = "Password is mandatory")
    @NotNull(message = "Password is mandatory")
    @Size(min = 8, message = "Password should be 8 characters long minimum")
    private String password;
    @NotEmpty(message = "cin is mandatory")
    @NotNull(message = "cin is mandatory")
    @Size(min = 8, max = 8 ,message = "cin should be 8 characters long")
    private String cin;

    private LocalDate dateOfBirth;
    @NotEmpty(message = "phoneNumber is mandatory")
    @NotNull(message = "phoneNumber is mandatory")
    private String phoneNumber;
    private String speciality;
    private String workplace;
    private String company;
    private String pdfFile;
}
