package com.jacyl.travelholic.repositories;


import com.jacyl.travelholic.domain.Group;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface GroupRepository extends MongoRepository<Group, String> {
    Group findByName(String name);

    List<Group> findAll();
}
