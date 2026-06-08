package com.leslie.library_system.model;

import jakarta.persistence.*;
import lombok.*;

@Setter @Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String author;

    @Column(unique = true)
    private String isbn;

    private String description;

    private int totalStock;
    private int usedStock;
}
