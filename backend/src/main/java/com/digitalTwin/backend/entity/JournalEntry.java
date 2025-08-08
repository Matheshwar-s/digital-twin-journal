package com.digitalTwin.backend.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import lombok.Data;
@Data
@Entity
public class JournalEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String content;
    @Enumerated(EnumType.STRING)
    private Mood mood;

    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @Lob
@Column(columnDefinition = "LONGTEXT")
    private String aiReflection;

    // Getters and Setters
}
