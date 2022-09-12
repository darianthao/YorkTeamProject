package net.yorksolutions.backend.controllers;

import net.yorksolutions.backend.models.PricePeriods;
import net.yorksolutions.backend.repositories.PricePeriodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/prices")
public class PricePeriodController {

    @Autowired
    PricePeriodRepository pricePeriodRepo;

    @Autowired
    ProductController productController;

    @PostMapping("/add")
    public String add(@RequestBody PricePeriods price) {
        pricePeriodRepo.save(price);
        productController.updatePrices();
        return "success";
    }

    @GetMapping("/getAll")
    public Iterable<PricePeriods> getAll() {
        return pricePeriodRepo.findAll();
    }

    @PutMapping("/edit")
    public String edit(@RequestBody PricePeriods price) {
        pricePeriodRepo.findById(price.getId()).orElseThrow();
        pricePeriodRepo.save(price);
        productController.updatePrices();
        return "success";
    }

    @DeleteMapping("/remove/{id}")
    public String remove(@PathVariable long id) {
        pricePeriodRepo.deleteById(id);
        return "success";
    }

    @GetMapping("/checkPriceExists/{productId}")
    public boolean checkPriceExists(@PathVariable long productId) {

        //Get the current Date to pass in
        long millis = System.currentTimeMillis();
        java.sql.Date date = new java.sql.Date(millis);

        List<PricePeriods> results = pricePeriodRepo.checkPriceExists(productId, date);
        if (results.isEmpty()) {
            return false;
        } else {
            return true;
        }
    }

    @GetMapping("/getByProductId/{productId}")
    public float getPriceByProductId(@PathVariable long productId) {

        //Get the current Date to pass in
        long millis = System.currentTimeMillis();
        java.sql.Date date = new java.sql.Date(millis);

        return pricePeriodRepo.getPriceByProductId(productId, date).get(0).getPrice();
    }

}