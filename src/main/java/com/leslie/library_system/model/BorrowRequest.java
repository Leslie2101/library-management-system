package com.leslie.library_system.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

public class BorrowRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User student;

    @ManyToOne
    private Book book;

    private int quantity;

    @Enumerated(EnumType.STRING)
    private RequestStatus status = RequestStatus.PENDING;

    private LocalDateTime requestDate = LocalDateTime.now();
    private LocalDateTime processedDate;

    @ManyToOne
    private User processedBy;

    private String rejectionReason;

    public BorrowRequest() {}

    public BorrowRequest(User student, Book book, int quantity) {
        this.student = student;
        this.book = book;
        this.quantity = quantity;
        this.status = RequestStatus.PENDING;
        this.requestDate = LocalDateTime.now();
    }
}
