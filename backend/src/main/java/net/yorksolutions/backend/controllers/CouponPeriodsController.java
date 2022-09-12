package net.yorksolutions.backend.controllers;

import net.yorksolutions.backend.models.CouponPeriods;
import net.yorksolutions.backend.repositories.CouponPeriodsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/coupons")
public class CouponPeriodsController {
    @Autowired
    CouponPeriodsRepository couponPeriodsRepo;

    @PostMapping("/add")
    public String add(@RequestBody CouponPeriods coupon) {
        couponPeriodsRepo.save(coupon);
        return "success";
    }

    @GetMapping("/getAll")
    public Iterable<CouponPeriods> getAll() {
        return couponPeriodsRepo.findAll();
    }

    @GetMapping("/getAllActive")
    public Iterable<CouponPeriods> getAllActive() {
        //Get the current Date to pass in
        long millis = System.currentTimeMillis();
        java.sql.Date date = new java.sql.Date(millis);
        return couponPeriodsRepo.findActiveCoupons(date);
    }

    @GetMapping("/validate/{couponCode}")
    public boolean validateCoupon(@PathVariable String couponCode) {

        //Get the current Date to pass in
        long millis = System.currentTimeMillis();
        java.sql.Date date = new java.sql.Date(millis);

        List<CouponPeriods> results = couponPeriodsRepo.validateCoupon(couponCode, date);
        if (results.isEmpty()) {
            return false;
        } else {
            return true;
        }
    }

    @GetMapping("/getDiscountByCode/{code}")
    public float getDiscountByCouponCode(@PathVariable String code) throws Exception {
        List<CouponPeriods> results = couponPeriodsRepo.findBycouponCode(code);
        if (results.isEmpty()) {
            throw new Exception("" +
                    "Coupon does not exist.");
        }
        return results.get(0).getDiscount();
    }

    @PutMapping("/edit")
    public String edit(@RequestBody CouponPeriods coupon) {
        couponPeriodsRepo.findById(coupon.getId()).orElseThrow();
        couponPeriodsRepo.save(coupon);
        return "success";
    }

    @DeleteMapping("/remove/{id}")
    public String remove(@PathVariable long id) {
        couponPeriodsRepo.deleteById(id);
        return "success";
    }

}