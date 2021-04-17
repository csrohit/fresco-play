package com.example.project.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class ApplicationUser {
    @Id
    @Column(name = "username")
    public String username;
    public String email;
    public String password;
    public String mobile;
    public String location;

    public ApplicationUser(String username, String email, String password, String mobile, String location) {
        super();
        this.username = username;
        this.email = email;
        this.password = password;
        this.mobile = mobile;
        this.location = location;
    }

    public ApplicationUser() {
        super();
    }


    public ApplicationUser(String username, String password) {
        super();
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
