package com.leslie.library_system.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "borrow_requests")
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
    private RequestStatus status;

    private LocalDateTime requestDate;
    private LocalDateTime processedDate;

    @ManyToOne
    private User processedBy;

    private String rejectionReason;

}
