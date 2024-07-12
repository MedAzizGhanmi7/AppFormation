package com.cni.AppFormationBackend.User;

import com.cni.AppFormationBackend.File.FileStorageService;
import com.cni.AppFormationBackend.File.FileUtils;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.MalformedURLException;
import java.nio.file.Path;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("user")
@RequiredArgsConstructor
@Tag(name = "User")
public class UserController {
    private final UserService userService;
    private final FileStorageService fileStorageService;


    @GetMapping("/all")
    public ResponseEntity<List<User>> findAll() throws MessagingException {
        List<User> users = userService.findAll();
        return ResponseEntity.ok(users);
    }

    @PutMapping("/toggleAccount/{userId}")
    public ResponseEntity<String> toggleUserAccount(@PathVariable Long userId) {
        try {
            boolean toggled = userService.toggleUserAccount(userId);
            String message = toggled ? "User account unlocked" : "User account locked";
            return ResponseEntity.ok(message);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<String> deleteUserAccount(@PathVariable("userId") Long userId) {
        try {
            userService.deleteUserById(userId);
            String message = "User account deleted";
            return ResponseEntity.ok(message);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable Long userId) {
        try {
            User user = userService.getUserById(userId);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping("/files/{userId}/uploads/users/{fileId}/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable Long userId,
                                                 @PathVariable String fileId,
                                                 @PathVariable String fileName) {

        String fileUrl = "uploads/users/" + userId + "/" + fileName;


        byte[] fileContent = FileUtils.readFileFromLocation(fileUrl);

        if (fileContent == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }


        ByteArrayResource resource = new ByteArrayResource(fileContent);


        String contentType = "application/octet-stream";


        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                .contentType(MediaType.parseMediaType(contentType))
                .body(resource);
    }



    @GetMapping("/allInstructors/{sessionId}")
    public ResponseEntity<List<User>> findAllInstructors(@PathVariable("sessionId") Long sessionId) throws MessagingException {
        List<User> instructors = userService.getAllInstructors(sessionId);
        return ResponseEntity.ok(instructors);
    }

    @GetMapping("partipant/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        try {
            User user = userService.getUserByEmail(email);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
