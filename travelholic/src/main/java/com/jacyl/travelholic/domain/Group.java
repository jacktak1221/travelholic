package com.jacyl.travelholic.domain;


import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Set;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
//@Entity
//@Table(name = "user_group")
@Document
public class Group {

    @Id
    private String id;
    @NonNull
    private String name;
    private String address;
    private String city;
    private String stateOrProvince;
    private String country;
    private String postalCode;
//    @ManyToOne(cascade=CascadeType.PERSIST)
//    private User user;
//
//    @OneToMany(fetch = FetchType.EAGER, cascade=CascadeType.ALL)
    private Set<Event> events;
}