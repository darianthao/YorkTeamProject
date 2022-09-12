package net.yorksolutions.backend.repositories;

import net.yorksolutions.backend.models.PricePeriods;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface PricePeriodRepository extends CrudRepository<PricePeriods, Long> {
    @Query("select p from PricePeriods p where p.productId = :productId and p.startDate <= :date and p.endDate >= :date")
    List<PricePeriods> checkPriceExists(
            @Param("productId") long productId,
            @Param("date") Date date
    );

    @Query("select p from PricePeriods p where p.productId = :productId and p.startDate <= :date and p.endDate >= :date order by p.startDate desc")
    List<PricePeriods> getPriceByProductId(
            @Param("productId") long productId,
            @Param("date") Date date
    );

}