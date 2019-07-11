package com.jacyl.travelholic.controller;


import com.jacyl.travelholic.domain.Contact;
import com.jacyl.travelholic.repositories.ContactRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/contact")
class ContactController {

    private final Logger log = LoggerFactory.getLogger(ContactController.class);
    private ContactRepository contactRepository;

    public ContactController(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @GetMapping("/findAll")
    Collection<Contact> findAll() {
        log.info("findAll()");
        return contactRepository.findAll();
    }

    @GetMapping("/get?id={id}")
    ResponseEntity<?> get(@PathVariable String id) {
        Optional<Contact> contact = contactRepository.findById(id);
        return contact.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/name/{name}")
    ResponseEntity<?> findByName(@PathVariable String name) {
        log.info("findByName() - " + name);
        List<Contact> result = contactRepository.findByName(name);

        return new ResponseEntity(result, HttpStatus.OK);
    }

    //    @PutMapping("/books/{id}")
//    public ResponseEntity<Book> updateBook(@PathVariable("id") String id, @RequestBody Book book) {
//        System.out.println("Update Book with ID = " + id + "...");
//
//        Optional<Book> bookData = bookRepository.findById(id);
//        if (bookData.isPresent()) {
//            Book savedBook = bookData.get();
//            savedBook.setTitle(book.getTitle());
//            savedBook.setAuthor(book.getAuthor());
//            savedBook.setDescription(book.getDescription());
//            savedBook.setPublished(book.getPublished());
//
//            Book updatedBook = bookRepository.save(savedBook);
//            return new ResponseEntity<>(updatedBook, HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//    }
//
    @PostMapping("/add")
    ResponseEntity<?> addContact(@Valid @RequestBody Contact contact) throws URISyntaxException {
        log.info("Request to add contact: {}", contact);
        Contact result = contactRepository.save(contact);
        return new ResponseEntity("Contact added successfully with Contact ID: " + result.getId(), HttpStatus.OK);
//        return ResponseEntity.created(new URI("/api/get?id=" + result.getId()))
//                .body(result);
    }

    @PostMapping("/batchAdd")
    public ResponseEntity<?> batchAddContact() {
        log.info("Request to batch add contact");

        List<Contact> list = new ArrayList<>();
        list.add(Contact.builder().name("Jack").city("Hong Kong").country("China").build());
        list.add(Contact.builder().name("Cheryl").city("Hong Kong").country("Canada").build());
        list.add(Contact.builder().name("Calista").city("Hong Kong").country("China").build());
        list.add(Contact.builder().name("Bill").city("Hong Kong").country("China").build());
        list.add(Contact.builder().name("Ross").city("Tokyo").country("Japan").build());
        list.add(Contact.builder().name("Ryan").city("Ma On Shan").country("China").build());

        for (Contact c : list) {
            contactRepository.save(c);
        }

        return new ResponseEntity("Batch Contact added successfully", HttpStatus.OK);
    }

    @PutMapping("/update")
    ResponseEntity<Contact> updateContact(@Valid @RequestBody Contact contact) {
        log.info("Request to update contact: {}", contact);
        Contact result = contactRepository.save(contact);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteContact(@PathVariable String id) {
        log.info("deleteContact() called - Request to delete contact: " + id);
        try {
            Optional<Contact> c = contactRepository.findById(id);
            if(c.isPresent()) {
                log.info(c.get().getName());
                contactRepository.deleteById(id);
            } else {
                throw new Exception(id + " cannot be found");
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Fail to delete!", HttpStatus.EXPECTATION_FAILED);
        }

        return new ResponseEntity("Contact deleted successfully", HttpStatus.OK);
    }

    @DeleteMapping("/deleteAll")
    public ResponseEntity<?> deleteAll() {
        log.info("deleteAll()");
        try {
            contactRepository.deleteAll();
        } catch (Exception e) {
            return new ResponseEntity<>("Fail to delete!", HttpStatus.EXPECTATION_FAILED);
        }

        return new ResponseEntity("Contact all deleted successfully", HttpStatus.OK);
    }
}
