package com.jacyl.travelholic.controller;


import com.jacyl.travelholic.domain.Group;
import com.jacyl.travelholic.repositories.GroupRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
class GroupController {

    private final Logger log = LoggerFactory.getLogger(GroupController.class);
    private GroupRepository groupRepository;

    public GroupController(GroupRepository groupRepository) {
        this.groupRepository = groupRepository;
    }

    @GetMapping("/group/findAll")
    Collection<Group> findAll() {
        return groupRepository.findAll();
    }

    @GetMapping("/group/get?id={id}")
    ResponseEntity<?> get(@PathVariable String id) {
        Optional<Group> group = groupRepository.findById(id);
        return group.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/group/add")
    ResponseEntity<Group> addGroup(@Valid @RequestBody Group group) throws URISyntaxException {
        log.info("Request to add group: {}", group);
        Group result = groupRepository.save(group);
        return ResponseEntity.created(new URI("/api/get?id=" + result.getId()))
                .body(result);
    }

    @PutMapping("/group/update?id={id}")
    ResponseEntity<Group> updateGroup(@PathVariable String id, @Valid @RequestBody Group group) {
        group.setId(id);
        log.info("Request to update group: {}", group);
        Group result = groupRepository.save(group);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/group/delete?id={id}")
    public ResponseEntity<?> deleteGroup(@PathVariable String id) {
        log.info("Request to delete group: {}", id);
        groupRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
