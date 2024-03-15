package com.example.demo.service.ServiceImpl;

import com.example.demo.entities.Role;
import com.example.demo.entities.User;
import com.example.demo.mapper.RoleMapper;
import com.example.demo.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {
    @Autowired
    RoleMapper roleMapper;

    @Override
    public List<Role> getAllRole() {
        return roleMapper.getAllRole();
    }

    @Override
    public Role getRoleByID(Long roleId) throws SQLException {
        return roleMapper.getRoleByID(roleId);
    }


    @Override
    public int createRole(Role role) throws SQLException {
        boolean isRoleExist = this.isRoleExist(role);
        int row = 0;
        if (isRoleExist) {
            row = roleMapper.updateRole(role);
        } else {
            row = roleMapper.insertRole(role);
        }
        return row;
    }

    @Override
    public boolean isRoleExist(Role role) throws SQLException {
        return roleMapper.isRoleExist(role);
    }
    @Override
    public int deleteRole(Role role) throws SQLException {
        return roleMapper.deleteRole(role);
    }

}






