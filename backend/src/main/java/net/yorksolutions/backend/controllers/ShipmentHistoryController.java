package net.yorksolutions.backend.controllers;

import net.yorksolutions.backend.models.ShipmentHistory;
import net.yorksolutions.backend.repositories.ShipmentHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/shipmentHistory")
public class ShipmentHistoryController {
    @Autowired
    ShipmentHistoryRepository shipmentHistoryRepo;

    @Autowired
    ProductController productController;

    @PostMapping("/add")
    public String add(@RequestBody ShipmentHistory shipment) {

        long millis = System.currentTimeMillis();
        java.sql.Date date = new java.sql.Date(millis);

        shipment.setPurchaseDate(date);
        productController.addShipmentToInventory(shipment);
        shipmentHistoryRepo.save(shipment);
        return "success";
    }

    @GetMapping("getAll")
    public Iterable<ShipmentHistory> getAll() {
        return shipmentHistoryRepo.findAll();
    }



}
