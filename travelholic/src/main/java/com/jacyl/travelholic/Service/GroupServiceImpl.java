package com.jacyl.travelholic.Service;

import com.jacyl.travelholic.domain.Group;
import com.jacyl.travelholic.repositories.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class GroupServiceImpl implements GroupService {

    @Autowired
    GroupRepository groupRepository;

    @Override
    public Group findByName(String name) {
        return groupRepository.findByName(name);
    }

    @Override
    public List<Group> findAll() {
        return null;
    }

    @Override
    public void saveOrUpdateGroup(Group group) {
        groupRepository.save(group);
    }

    @Override
    public void deleteGroup(Group group) {
        groupRepository.delete(group);
    }
}
