package net.yorksolutions.backend.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.sql.Date;
import java.util.List;

@Entity
public class OrderHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) //making a new ID automatically.
    @JsonProperty
    private long id;

    @JsonProperty
    private long customerId;

    @JsonProperty
    @ElementCollection

    public List<CartItem> cartSnapshot;

    @JsonProperty
    Date orderDate;


    @JsonProperty
    float priceSnapshot;

    // ---Getters---


    public Long getId() {
        return id;
    }

    public long getCustomerId() {
        return customerId;
    }

    public List<CartItem> getCartSnapshot() {return cartSnapshot;}


    public Date getOrderDate() {
        return orderDate;
    }

    public float getPriceSnapshot() {
        return priceSnapshot;
    }

    //---Setters---
    public void setOrderDate(Date orderDate) {this.orderDate = orderDate;}


}
