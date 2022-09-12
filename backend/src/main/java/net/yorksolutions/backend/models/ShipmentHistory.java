package net.yorksolutions.backend.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Date;

@Entity
public class ShipmentHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty
    private long id;



    @JsonProperty
    private long productId;


    @JsonProperty
    Date purchaseDate;

    @JsonProperty
    float pricePerItem;

    @JsonProperty
    int quantity;

    public long getId() { return id; }

    public int getQuantity() {return quantity;}

    public long getProductId() {return productId;}

    public void setPurchaseDate(Date purchaseDate) {this.purchaseDate = purchaseDate;}





}
