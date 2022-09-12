package net.yorksolutions.backend.repositories;

import net.yorksolutions.backend.models.ShipmentHistory;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShipmentHistoryRepository extends CrudRepository<ShipmentHistory, Long> {
}
