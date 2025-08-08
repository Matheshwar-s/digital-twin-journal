package com.digitalTwin.backend.controller;

import com.digitalTwin.backend.entity.JournalEntry;
import com.digitalTwin.backend.service.JournalService;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/journals")
public class JournalController {

    private final JournalService journalService;

    public JournalController(JournalService journalService) {
        this.journalService = journalService;
    }

    // ✅ GET all entries for a user
    @GetMapping("/{username}")
    public List<JournalEntry> getAll(@PathVariable String username) {
        return journalService.getAllEntries(username);
    }

    // ✅ GET entries by date for a user
    @GetMapping("/{username}/by-date")
    public List<JournalEntry> getByDate(
        @PathVariable String username,
        @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
    ) {
        return journalService.getEntriesByDate(username, date);
    }

    // ✅ POST create entry
    @PostMapping("/{username}")
    public JournalEntry create(@PathVariable String username, @RequestBody JournalEntry entry) {
        return journalService.createEntry(username, entry);
    }

    // ✅ PUT update entry
    @PutMapping("/{username}/{id}")
    public JournalEntry update(
        @PathVariable String username,
        @PathVariable Long id,
        @RequestBody JournalEntry entry
    ) {
        return journalService.updateEntry(id, entry, username);
    }

    // ✅ DELETE entry
    @DeleteMapping("/{username}/{id}")
    public void delete(@PathVariable String username, @PathVariable Long id) {
        journalService.deleteEntry(id, username);
    }
}

