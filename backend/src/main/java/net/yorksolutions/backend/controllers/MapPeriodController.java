package net.yorksolutions.backend.controllers;

import net.yorksolutions.backend.models.MapPeriods;
import net.yorksolutions.backend.repositories.MapPeriodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/maps")
public class MapPeriodController {

    @Autowired
    MapPeriodRepository mapPeriodRepo;

    @Autowired
    ProductController productController;

    @PostMapping("/add")
    public String add(@RequestBody MapPeriods mapPrice) {
        mapPeriodRepo.save(mapPrice);
        productController.updateMapPrices();
        return "success";
    }

    @PutMapping("/edit")
    public String edit(@RequestBody MapPeriods mapPrice) {
        mapPeriodRepo.findById(mapPrice.getId()).orElseThrow();
        mapPeriodRepo.save(mapPrice);
        productController.updateMapPrices();
        return "success";
    }

    @DeleteMapping("/remove/{id}")
    public String remove(@PathVariable long id) {
        mapPeriodRepo.deleteById(id);
        return "success";
    }

    @GetMapping("/getAll")
    public Iterable<MapPeriods> getAll() {
        return mapPeriodRepo.findAll();
    }

    @GetMapping("/checkMapPriceExists/{productId}")
    public boolean checkMapPriceExists(@PathVariable long productId) {

        //Get the current Date to pass in
        long millis = System.currentTimeMillis();
        java.sql.Date date = new java.sql.Date(millis);

        List<MapPeriods> results = mapPeriodRepo.checkMapPriceExists(productId, date);
        if (results.isEmpty()) {
            return false;
        } else {
            return true;
        }
    }

    @GetMapping("/getByProductId/{productId}")
    public float getMapPriceByProductId(@PathVariable long productId) {

        //Get the current Date to pass in
        long millis = System.currentTimeMillis();
        java.sql.Date date = new java.sql.Date(millis);

        return mapPeriodRepo.getMapPriceByProductId(productId, date).get(0).getPrice();
    }

}