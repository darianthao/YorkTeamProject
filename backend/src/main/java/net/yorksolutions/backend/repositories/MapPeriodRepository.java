package net.yorksolutions.backend.repositories;

import net.yorksolutions.backend.models.MapPeriods;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface MapPeriodRepository extends CrudRepository<MapPeriods, Long> {
    @Query("select m from MapPeriods m where m.productId = :productId and m.startDate <= :date and m.endDate >= :date")
    List<MapPeriods> checkMapPriceExists(
            @Param("productId") long productId,
            @Param("date") Date date
    );

    @Query("select m from MapPeriods m where m.productId = :productId and m.startDate <= :date and m.endDate >= :date order by m.startDate desc")
    List<MapPeriods> getMapPriceByProductId(
            @Param("productId") long productId,
            @Param("date") Date date
    );
}