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
@Table(name = "return_requests")
public class ReturnRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private BorrowRecord borrowRecord;

    @ManyToOne
    private User student;

    @Enumerated(EnumType.STRING)
    private RequestStatus status;

    private LocalDateTime requestDate;
    private LocalDateTime processedDate;

    @ManyToOne
    private User processedBy;

    private String rejectionReason;
}