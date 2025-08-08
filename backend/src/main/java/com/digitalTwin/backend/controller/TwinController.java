package com.digitalTwin.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.digitalTwin.backend.service.JournalService;
import com.digitalTwin.backend.service.TwinService;
import com.digitalTwin.backend.dto.ChatRequest;

@RestController
@RequestMapping("/api/twin")
public class TwinController {

    @Autowired
    private JournalService journalService;
    @Autowired
    private TwinService twinService;

    @GetMapping("/{username}")
    public ResponseEntity<Map<String, String>> getTwinInsights(@PathVariable String username) {
        String aiSummary = journalService.generateAISummary(username); // summary across entries
        String ghostMessage = journalService.generateGhostMessage(username); // one reflective quote
        return ResponseEntity.ok(Map.of(
            "summary", aiSummary,
            "message", ghostMessage
        ));
    }
    @PostMapping("/chat")
public ResponseEntity<?> chatWithTwin(@RequestBody ChatRequest chat) {
    String response = twinService.generateChatResponse(chat.getUsername(), chat.getPrompt());
    return ResponseEntity.ok(Map.of("reply", response));
}

}
