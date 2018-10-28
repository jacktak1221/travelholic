package com.jacyl.travelholic.domain;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
//@Entity
@Document
public class Event {

    @Id
    private Long id;
    private Instant date;
    private String title;
    private String description;
//    @ManyToMany
//    private Set<User> attendees;
}