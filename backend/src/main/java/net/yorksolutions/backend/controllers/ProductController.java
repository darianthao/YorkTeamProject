package net.yorksolutions.backend.controllers;

import net.yorksolutions.backend.models.CartItem;
import net.yorksolutions.backend.models.Products;
import net.yorksolutions.backend.models.ShipmentHistory;
import net.yorksolutions.backend.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Lazy(false)
@Component
@CrossOrigin
@RestController
@RequestMapping("/products")
public class ProductController {
    @Lazy
    @Autowired
    ProductRepository productRepo;

    @Lazy
    @Autowired
    PricePeriodController priceController;

    @Lazy
    @Autowired
    SalePeriodController saleController;

    @Lazy
    @Autowired
    MapPeriodController mapController;

    @Scheduled(cron = "0 0 3 * * ?")
    @PutMapping("/updatePrices")
    public String updatePrices(){

        Iterable<Products> productsList = productRepo.findAll();

        for(Products product : productsList){
            if(priceController.checkPriceExists(product.getId())){
                product.setPrice(priceController.getPriceByProductId(product.getId()));
                productRepo.save(product);
            }
        }
        return "success";
    }

    @Scheduled(cron = "0 0 3 * * ?")
    @PutMapping("/updateSales")
    public String updateSales(){
        Iterable<Products> productsList = productRepo.findAll();

        for(Products product : productsList){
            if(saleController.checkSaleExists(product.getId())){
                product.setSalePrice(saleController.getSaleByProductId(product.getId()));
                productRepo.save(product);
            }
            else{
                product.setSalePrice(0);
                productRepo.save(product);
            }
        }
        return "success";
    }

    @Scheduled(cron = "0 0 3 * * ?")
    @PutMapping("/updateMapPrices")
    public String updateMapPrices(){
        Iterable<Products> productsList = productRepo.findAll();

        for(Products product : productsList){
            if(mapController.checkMapPriceExists(product.getId())){
                product.setMapPrice(mapController.getMapPriceByProductId(product.getId()));
                productRepo.save(product);
            }
        }
        return "success";
    }

    @PostMapping("/add")
    public String add(@RequestBody Products product) {
        try{
            productRepo.save(product);
        }catch(Exception e){
            return "e.message";
        }

        return "success";
    }

    @GetMapping("/getAll")
    public Iterable<Products> getAll() {
        return productRepo.findAll();
    }

    @GetMapping("/get/{productCategoryId}")
    public Iterable<Products> getByCategoryId(@PathVariable Long productCategoryId) {
        return productRepo.findByProductCategoryId(productCategoryId);
    }

    @GetMapping("/getOne/{id}")
    public Products getById(@PathVariable Long id) throws Exception {
        Optional<Products> optional = productRepo.findById(id);
        if (!optional.isPresent()) {
            throw new Exception("Product does not exist.");
        }
        return optional.get();
    }

    @PutMapping("/edit")
    public String edit(@RequestBody Products product) {
        productRepo.findById(product.getId()).orElseThrow();
        productRepo.save(product);
        return "success";
    }

    @DeleteMapping("/remove/{id}")
    public String remove(@PathVariable long id) {
        productRepo.deleteById(id);
        return "success";
    }


    /*
    For each cart item...
    1. Pull up the Product corresponding to the cart item
    2. Set the inventory of that product to be the current value minus the quantity purchased in the cart item
    3. Save the Product
     */
    public void removeFromInventory(List<CartItem> cart){
        for(CartItem item: cart){
            Products currentProduct = productRepo.findById(item.getProductId()).orElseThrow();
            currentProduct.setInventory(currentProduct.getInventory() - item.getQuantity());
            productRepo.save(currentProduct);
        }
    }

    public void addShipmentToInventory(ShipmentHistory shipment){

            Products currentProduct = productRepo.findById(shipment.getProductId()).orElseThrow();
            currentProduct.setInventory(currentProduct.getInventory() + shipment.getQuantity());
            productRepo.save(currentProduct);
    }

}
