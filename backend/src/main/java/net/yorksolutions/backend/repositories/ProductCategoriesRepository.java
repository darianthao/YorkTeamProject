package net.yorksolutions.backend.repositories;

import net.yorksolutions.backend.models.ProductCategories;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


//CrudRepository (CRUD) stands for - Create (Post), Read (Get), Update (Put), Delete (Delete).
@Repository
public interface ProductCategoriesRepository extends CrudRepository <ProductCategories, Long> {

}