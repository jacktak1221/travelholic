package com.jacyl.travelholic.Service;

import com.jacyl.travelholic.domain.Group;

import java.util.List;

public interface GroupService {
    Group findByName(String name);

    List<Group> findAll();

    void saveOrUpdateGroup(Group group);

    void deleteGroup(Group group);
}

