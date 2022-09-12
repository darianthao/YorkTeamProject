package net.yorksolutions.backend.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @JsonProperty
    String firstName;

    @JsonProperty
    String lastName;

    String email;

    private String password;

    @JsonProperty
    String address1;

    @JsonProperty
    String address2;

    @JsonProperty
    String city;

    @JsonProperty
    String state;

    @JsonProperty
    String zipCode;

    private int accountType;

    @JsonProperty
    @ElementCollection
    public List<CartItem> cart;

    public long getId() {
        return id;
    }

    public void resetId() {
        this.id = 0;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public int getAccountType() {
        return accountType;
    }

    public void setAccountType(int accountType) {
        this.accountType = accountType;
    }

    public void setCart(List<CartItem> cart) {
        this.cart = cart;
    }

    public void resetCart() {
        this.cart = new ArrayList<CartItem>();
    }

}
