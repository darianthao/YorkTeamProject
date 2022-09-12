package net.yorksolutions.backend.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Embeddable;

@Embeddable
public class CartItem {
    @JsonProperty
    long productId;

    @JsonProperty
    int quantity;

    @JsonProperty
    float price;

    public CartItem() {

    }

    public CartItem(long productId, int quantity, float price){
        this.productId = productId;
        this.quantity = quantity;
        this.price = price;
    }


    public long getProductId() {
        return productId;
    }

    public void setProductId(long productId) {
        this.productId = productId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }


}
