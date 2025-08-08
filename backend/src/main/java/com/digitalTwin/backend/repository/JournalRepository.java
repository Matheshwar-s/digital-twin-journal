package com.digitalTwin.backend.repository;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.digitalTwin.backend.entity.JournalEntry;
import com.digitalTwin.backend.entity.User;

public interface JournalRepository extends JpaRepository<JournalEntry, Long> {
    List<JournalEntry> findByUser(User user);
    List<JournalEntry> findByUserAndDate(User user, LocalDate date);
    List<JournalEntry> findTop5ByUserUsernameOrderByDateDesc(String username);
List<JournalEntry> findTop3ByUserUsernameOrderByDateDesc(String username);
List<JournalEntry> findTop50ByUserUsernameOrderByDateAsc(String username);


}