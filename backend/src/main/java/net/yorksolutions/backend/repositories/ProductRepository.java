package net.yorksolutions.backend.repositories;

import net.yorksolutions.backend.models.Products;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends CrudRepository<Products, Long> {
    Iterable<Products> findByProductCategoryId(Long productCategoryId);
}