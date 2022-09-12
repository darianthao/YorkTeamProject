package net.yorksolutions.backend.controllers;

import net.yorksolutions.backend.models.CartItem;
import net.yorksolutions.backend.models.Users;
import net.yorksolutions.backend.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

class loginCredentials {
    public String email;
    public String password;
}

@CrossOrigin
@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    UsersRepository userRepo;

    @PostMapping("/register")
    public String registerUser(@RequestBody Users user) {
        List<Users> usersList = userRepo.findByEmail(user.getEmail());
        if (usersList.isEmpty()) {
            user.setAccountType(0); // Guard clause: customer accounts only through this endpoint
            user.resetId(); // Guard clause: prevent over-write of any existing id on this endpoint
            userRepo.save(user);
            return "success";
        } else {
            return "email already exists";
        }
    }

    @PostMapping("/login")
    public String userLogin(@RequestBody loginCredentials credentials) {
        List<Users> userList = userRepo.findByEmailAndPassword(credentials.email, credentials.password);
        if (userList.isEmpty()) {
            return "fail";
        } else {
            return "success";
        }
    }

    @GetMapping("/get/{email}")
    Users getUsersEmail(@PathVariable String email) {
        List<Users> users = userRepo.findByEmail(email);
        return users.get(0);
    }

    @GetMapping("/getAll")
    public Iterable<Users> getAll() {
        return userRepo.findAll();
    }

    @PostMapping("/add")
    public String addUser(@RequestBody Users user) {
        List<Users> userList = userRepo.findByEmail(user.getEmail());
        if (userList.isEmpty()) {
            user.resetId(); // Guard clause: prevent over-write of any existing id on this endpoint
            userRepo.save(user);
            return "success";
        } else {
            return "email already exists";
        }
    }

    @PutMapping("/edit")
    public String editUser(@RequestBody Users user) {
        if (userRepo.findById(user.getId()).isPresent()) {
            List<Users> userList = userRepo.findByEmail(user.getEmail());
            if (userList.isEmpty()) {
                userRepo.save(user);
                return "success";
            } else if (userList.get(0).getId() == user.getId()) {
                userRepo.save(user);
                return "success";
            } else {
                return "email address unavailable";
            }
        } else {
            return "user does not exist";
        }
    }

    @DeleteMapping("/remove/{id}")
    String removeUser(@PathVariable Long id) {
        if (userRepo.findById(id).isPresent()) {
            userRepo.deleteById(id);
            return "success";
        } else {
            return "user does not exist";
        }
    }

    @PutMapping("/editCart/{id}")
    String editCart(@PathVariable long id, @RequestBody List<CartItem> cart) {
        Users currentUser = userRepo.findById(id).orElseThrow();

        currentUser.setCart(cart);
        userRepo.save(currentUser);
        return "success";
    }

    void clearCart(long id){
        Users currentUser = userRepo.findById(id).orElseThrow();
        currentUser.resetCart();
        userRepo.save(currentUser);
    }
}







