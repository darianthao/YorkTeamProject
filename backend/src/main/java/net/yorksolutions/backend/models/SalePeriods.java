package net.yorksolutions.backend.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Date;

@Entity
public class SalePeriods {

    @JsonProperty
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @JsonProperty
    String saleName;

    @JsonProperty
    private long productId;

    @JsonProperty
    Date startDate;

    @JsonProperty
    Date endDate;

    @JsonProperty
    float price;

    public long getId() {
        return id;
    }

    public float getPrice() {
        return price;
    }
}