package com.jacyl.travelholic.Service;

import com.jacyl.travelholic.domain.Contact;
import com.jacyl.travelholic.repositories.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;


import java.util.List;

public class ContactServiceImpl implements ContactService {

    @Autowired
    ContactRepository contactRepository;

    @Autowired
    MongoTemplate mongoTemplate;

    @Override
    public List<Contact> findByName(String name) {
        Criteria regex = Criteria.where("name").regex("*" + name + "*", "i");
        return mongoTemplate.find(new Query().addCriteria(regex), Contact.class);
    }

    @Override
    public List<Contact> findAll() {
        return null;
    }

    @Override
    public void saveOrUpdateContact(Contact contact) {
        contactRepository.save(contact);
    }

    @Override
    public void deleteContact(Contact contact) {
        contactRepository.delete(contact);
    }
}
