package net.yorksolutions.backend.controllers;

import net.yorksolutions.backend.models.ProductCategories;
import net.yorksolutions.backend.repositories.ProductCategoriesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/productCategories")
public class ProductCategoriesController {

    @Autowired
    ProductController productController;

    @Autowired
    ProductCategoriesRepository productCategoriesRepo;

    @GetMapping("/getAll")
    public Iterable<ProductCategories> getAll() {
        return productCategoriesRepo.findAll();
    }

    @PostMapping("/add")
    public String add(@RequestBody ProductCategories newCategory) {
        productCategoriesRepo.save(newCategory);
        return "success";
    }

    public boolean categoryNotEmpty(long categoryId) {
        List CatList = (List) productController.getByCategoryId(categoryId);

        if (CatList.isEmpty()) {
            return false;
        }
        return true;
    }

    @DeleteMapping("/remove/{id}")
    public String remove(@PathVariable long id) {
        if (categoryNotEmpty(id)) {
            System.out.println("failure");
            return "failure";
        }
        productCategoriesRepo.deleteById(id);
        return "success";
    }

    @PutMapping("/edit")
    public String edit(@RequestBody ProductCategories category) {
        if (productCategoriesRepo.findById(category.getId()).isPresent()) {
            productCategoriesRepo.save(category);
            return "success";
        } else {
            return "category does not exist";
        }
    }

}