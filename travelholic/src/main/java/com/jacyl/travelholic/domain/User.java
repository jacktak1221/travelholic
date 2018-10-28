package com.jacyl.travelholic.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

//import javax.persistence.Entity;
//import javax.persistence.Id;

@Data
@NoArgsConstructor
@AllArgsConstructor
//@Entity
@Document
public class User {

    @Id
    private String id;
    private String name;
    private String email;
}
