package com.example.demo.service;

import com.example.demo.entities.Role;
import com.example.demo.entities.User;

import java.sql.SQLException;
import java.util.List;

public interface RoleService {
    /**
     * <h1>Get All Role</h1>
     *
     * @return List<Role>
     * @throws SQLException
     */
    List<Role> getAllRole() throws SQLException;
    int createRole(Role role) throws SQLException;
    int deleteRole(Role role) throws SQLException;
    Role getRoleByID(Long roleId) throws SQLException;
    boolean isRoleExist(Role role) throws SQLException;
}
