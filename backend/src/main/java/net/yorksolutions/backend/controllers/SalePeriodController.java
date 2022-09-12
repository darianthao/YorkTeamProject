package net.yorksolutions.backend.controllers;

import net.yorksolutions.backend.models.SalePeriods;
import net.yorksolutions.backend.repositories.SalePeriodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/sales")
public class SalePeriodController {

    @Autowired
    SalePeriodRepository salePeriodRepo;

    @Autowired
    ProductController productController;

    @GetMapping("/getAll")
    public Iterable<SalePeriods> getAll() {
        return salePeriodRepo.findAll();
    }

    @GetMapping("/getActive")
    public Iterable<SalePeriods> getAllActive() {

        //Get the current Date to pass in
        long millis = System.currentTimeMillis();
        java.sql.Date date = new java.sql.Date(millis);

        return salePeriodRepo.findActiveSales(date);
    }

    @PostMapping("/add")
    public String add(@RequestBody SalePeriods sale) {
        salePeriodRepo.save(sale);
        productController.updateSales();
        return "success";
    }

    @PutMapping("/edit")
    public String edit(@RequestBody SalePeriods sale) {
        salePeriodRepo.findById(sale.getId()).orElseThrow();
        salePeriodRepo.save(sale);
        productController.updateSales();
        return "success";
    }

    @DeleteMapping("/remove/{id}")
    public String remove(@PathVariable long id) {
        salePeriodRepo.deleteById(id);
        productController.updateSales();
        return "success";
    }

    @GetMapping("/checkSaleExists/{productId}")
    public boolean checkSaleExists(@PathVariable long productId) {

        //Get the current Date to pass in
        long millis = System.currentTimeMillis();
        java.sql.Date date = new java.sql.Date(millis);

        List<SalePeriods> results = salePeriodRepo.checkSaleExists(productId, date);
        if (results.isEmpty()) {
            return false;
        } else {
            return true;
        }
    }

    @GetMapping("/getByProductId/{productId}")
    public float getSaleByProductId(@PathVariable long productId) {

        //Get the current Date to pass in
        long millis = System.currentTimeMillis();
        java.sql.Date date = new java.sql.Date(millis);

        return salePeriodRepo.getSaleByProductId(productId, date).get(0).getPrice();
    }

}