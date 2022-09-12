package net.yorksolutions.backend.repositories;

import net.yorksolutions.backend.models.OrderHistory;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;


//CrudRepository (CRUD) stands for - Create (Post), Read (Get), Update (Put), Delete (Delete).
@Repository
public interface OrderHistoryRepository extends CrudRepository <OrderHistory, Long> {

    Iterable<OrderHistory> findByCustomerId(Long customerId);


    @Transactional //this is needed to delete by customer ID
    void deleteByCustomerId(Long customerId);

    @Transactional //this is needed to delete by order ID
    void deleteById(Long id);
}
