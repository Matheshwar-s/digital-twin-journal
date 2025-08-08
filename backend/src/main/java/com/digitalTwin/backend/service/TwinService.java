package com.digitalTwin.backend.service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitalTwin.backend.entity.JournalEntry;
import com.digitalTwin.backend.repository.JournalRepository;

@Service
public class TwinService {

    @Autowired
    private JournalRepository journalRepository;

    @Autowired
    private GeminiService geminiService; // Your Gemini AI integration service

    public String generateChatResponse(String username, String prompt) {
        List<JournalEntry> userJournals = journalRepository.findTop50ByUserUsernameOrderByDateAsc(username);


        String journalText = userJournals.stream()
            .sorted(Comparator.comparing(JournalEntry::getDate))
            .map(JournalEntry::getContent)
            .collect(Collectors.joining("\n"));

        String systemPrompt = """
            You are the past self of the user, reflecting on their journey so far.
            Base your replies only on their past journal entries.
            Be wise, gentle, and a little cryptic like a memory ghost.

            Journals:
            %s

            Question:
            %s
        """.formatted(journalText, prompt);

        return geminiService.generateChatResponse(systemPrompt); // Gemini generates the response
    }
}
