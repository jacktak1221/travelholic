package com.jacyl.travelholic.repositories;


import com.jacyl.travelholic.domain.Contact;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ContactRepository extends MongoRepository<Contact, String> {
    List<Contact> findByName(String name);

    List<Contact> findAll();


    //List<Contact> findByPartialName(String name);
}
