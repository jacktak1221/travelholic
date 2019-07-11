package com.jacyl.travelholic.Service;

import com.jacyl.travelholic.domain.Contact;

import java.util.List;

public interface ContactService {
    List<Contact> findByName(String name);

    List<Contact> findAll();

    void saveOrUpdateContact(Contact contact);

    void deleteContact(Contact contact);
}

