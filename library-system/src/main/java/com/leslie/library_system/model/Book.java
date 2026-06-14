package com.leslie.library_system.model;

import com.leslie.library_system.exception.InvalidRequestException;
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

    public int getAvailableStock(){
        return totalStock - usedStock;
    }

    public void borrow(int quantity){
        if (quantity > getAvailableStock()){
            throw new InvalidRequestException(
                    String.format(
                            "Only %d copies available, but %d borrowed",
                            getAvailableStock(),
                            quantity
                    )
            );
        }

        this.usedStock += quantity;
    }

    public void returnBook(int quantity) {
        if (quantity <= 0 || quantity > usedStock){
            throw new InvalidRequestException("Number of returned book cannot be negative or over number of book being borrowed currently");
        }

        this.usedStock -= quantity;
    }
}
