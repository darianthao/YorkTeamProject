package net.yorksolutions.backend.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Date;

@Entity
public class CouponPeriods {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty
    private long id;

    @JsonProperty
    String couponCode;

    @JsonProperty
    Date startDate;

    @JsonProperty
    Date endDate;

    @JsonProperty
    float discount;

    public long getId() {
        return id;
    }

    public float getDiscount() {
        return discount;
    }

}
