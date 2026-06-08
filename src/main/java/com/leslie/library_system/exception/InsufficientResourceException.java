package com.leslie.library_system.exception;

public class InsufficientResourceException extends RuntimeException{
    public InsufficientResourceException(String message){
        super(message);
    }
}
