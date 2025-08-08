package com.digitalTwin.backend.service;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitalTwin.backend.entity.JournalEntry;
import com.digitalTwin.backend.entity.User;
import com.digitalTwin.backend.repository.JournalRepository;
import com.digitalTwin.backend.repository.UserRepository;

@Service
public class JournalService {
    @Autowired
    private final JournalRepository journalRepository;
    @Autowired
    private final UserRepository userRepository;

    public JournalService(JournalRepository journalRepository, UserRepository userRepository) {
        this.journalRepository = journalRepository;
        this.userRepository = userRepository;
    }

    public List<JournalEntry> getAllEntries(String username) {
        User user = userRepository.findByUsername(username).orElseThrow();
        return journalRepository.findByUser(user);
    }

    public List<JournalEntry> getEntriesByDate(String username, LocalDate date) {
        User user = userRepository.findByUsername(username).orElseThrow();
        return journalRepository.findByUserAndDate(user, date);
    }

    @Autowired
private GeminiService geminiService;

public JournalEntry createEntry(String username, JournalEntry entry) {
    User user = userRepository.findByUsername(username).orElseThrow();
    entry.setUser(user);

    // ✅ Set current date
    entry.setDate(LocalDate.now());

    // ✅ Generate AI reflection using Gemini
    String reflection = geminiService.generateReflection(entry.getContent(), entry.getMood().name());
    entry.setAiReflection(reflection);

    return journalRepository.save(entry);
}



    public JournalEntry updateEntry(Long id, JournalEntry updatedEntry, String username) {
        JournalEntry existing = journalRepository.findById(id).orElseThrow();
        if (!existing.getUser().getUsername().equals(username)) throw new RuntimeException("Unauthorized");

        existing.setTitle(updatedEntry.getTitle());
        existing.setContent(updatedEntry.getContent());
        existing.setMood(updatedEntry.getMood());
        existing.setDate(updatedEntry.getDate());
        return journalRepository.save(existing);
    }

    public void deleteEntry(Long id, String username) {
        JournalEntry existing = journalRepository.findById(id).orElseThrow();
        if (!existing.getUser().getUsername().equals(username)) throw new RuntimeException("Unauthorized");

        journalRepository.delete(existing);
    }
    public String generateAISummary(String username) {
    List<JournalEntry> entries = journalRepository.findTop5ByUserUsernameOrderByDateDesc(username);

    if (entries.isEmpty()) {
        return "No recent journal entries found to summarize.";
    }

    StringBuilder promptBuilder = new StringBuilder();
    promptBuilder.append("You're an empathetic digital twin summarizing the user's mindset over the past week.\n\n");

    for (JournalEntry entry : entries) {
        promptBuilder.append("Date: ").append(entry.getDate()).append("\n");
        promptBuilder.append("Mood: ").append(entry.getMood()).append("\n");
        promptBuilder.append("Entry: ").append(entry.getContent()).append("\n\n");
    }

    return geminiService.generateReflection(promptBuilder.toString(), "summary");
}
public String generateGhostMessage(String username) {
    List<JournalEntry> entries = journalRepository.findTop3ByUserUsernameOrderByDateDesc(username);

    if (entries.isEmpty()) {
        return "You haven't written anything recently... Past you is silent.";
    }

    StringBuilder prompt = new StringBuilder();
    prompt.append("You are the user's digital twin. Read these recent entries and reply as if you're their past self giving a short, comforting or wise one-line message.\n\n");

    for (JournalEntry entry : entries) {
        prompt.append("Entry: ").append(entry.getContent()).append("\n");
    }

    prompt.append("\nReply with a brief one-liner message:");

    return geminiService.generateReflection(prompt.toString(), "ghost");
}


}

