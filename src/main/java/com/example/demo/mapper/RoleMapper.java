package com.example.demo.mapper;

import com.example.demo.entities.Role;
import com.example.demo.entities.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.sql.SQLException;
import java.util.List;

@Mapper
public interface RoleMapper {
    List<Role> getAllRole();
    int insertRole(Role role);
    int updateRole(Role role);
    int deleteRole(Role role);
    boolean isRoleExist(Role role);
    Role getRoleByID(@Param("roleId") Long roleId) throws SQLException;


}
