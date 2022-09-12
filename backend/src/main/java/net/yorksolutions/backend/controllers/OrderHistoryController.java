package net.yorksolutions.backend.controllers;

import net.yorksolutions.backend.models.OrderHistory;
import net.yorksolutions.backend.repositories.OrderHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/orderHistory")
public class OrderHistoryController {
    @Autowired
    OrderHistoryRepository orderHistoryRepo;

    @Autowired
    ProductController productController;

    @Autowired
    UserController userController;

    @PostMapping("/checkout")
    public String checkout(@RequestBody OrderHistory order){
        //get current date
        long millis = System.currentTimeMillis();
        java.sql.Date date = new java.sql.Date(millis);

        OrderHistory localOrder = order;

        localOrder.setOrderDate(date);


        System.out.println(localOrder);
        //If they are logged in as a user, clear their cart
        if(localOrder.getCustomerId() != 0){
            userController.clearCart(localOrder.getCustomerId());
        }

        //Remove the purchased Products from inventory
        productController.removeFromInventory(localOrder.getCartSnapshot());

        //Save order

        orderHistoryRepo.save(localOrder);
        return "success";
    }


    @GetMapping("/getAll")
    public Iterable<OrderHistory>getAll() {
        return orderHistoryRepo.findAll();
    }

    @PostMapping("/add")
    public String addOrderHistory(@RequestBody OrderHistory addOrderHistory) {
        orderHistoryRepo.save(addOrderHistory);
        return "success";
    }

    @GetMapping("/getByCustomerId/{customerId}")
    public Iterable <OrderHistory> getByCustomerId (@PathVariable Long customerId) {
        return orderHistoryRepo.findByCustomerId(customerId);
    }

    @GetMapping("/getById/{orderId}")
    public OrderHistory getById (@PathVariable Long id) {
        return orderHistoryRepo.findById(id).orElseThrow();
    }

    @DeleteMapping ("/removeByCustomerId/{customerId}") //DeleteMapping is used when we try to delete the data in back end
    String removeByCustomerId (@PathVariable Long customerId) {
        orderHistoryRepo.deleteByCustomerId(customerId);
        return "success";
    }

    @DeleteMapping ("/removeByOrderId/{orderId}") //DeleteMapping is used when we try to delete the data in back end
    String removeByOrderId (@PathVariable Long orderId) {
        orderHistoryRepo.deleteById(orderId);
        return "success";
    }

}
