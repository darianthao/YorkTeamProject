package net.yorksolutions.backend.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.sql.Date;

@Entity
public class Products {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty
    private long id;


    @JsonProperty
    String name;


    @JsonProperty
    String brand;


    @JsonProperty
    String description;

    @JsonProperty
    private String image;

    @JsonProperty
    int inventory;


    @JsonProperty
    Date availableOnDate;

    @JsonProperty
    boolean isDiscontinued;


    @JsonProperty
    long productCategoryId;


    @JsonProperty
    float price;


    @JsonProperty
    float salePrice;



    @JsonProperty
    float mapPrice;


    public void setMapPrice(float mapPrice) {this.mapPrice = mapPrice;}


    public void setPrice(float price) {
        this.price = price;
    }

    public int getInventory() {
        return inventory;
    }

    public void setInventory(int inventory) {
        this.inventory = inventory;
    }


    public void setSalePrice(float salePrice) {
        this.salePrice = salePrice;
    }

    public float getPrice(){
        return price;
    }


    public long getId() { return id; }
}
