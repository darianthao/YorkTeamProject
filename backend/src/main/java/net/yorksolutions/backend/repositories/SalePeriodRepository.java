package net.yorksolutions.backend.repositories;

import net.yorksolutions.backend.models.SalePeriods;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface SalePeriodRepository extends CrudRepository<SalePeriods, Long> {
    @Query("select s from SalePeriods s where s.productId = :productId and s.startDate <= :date and s.endDate >= :date")
    List<SalePeriods> checkSaleExists(
            @Param("productId") long productId,
            @Param("date") Date date
    );

    @Query("select s from SalePeriods s where s.productId = :productId and s.startDate <= :date and s.endDate >= :date order by s.startDate desc")
    List<SalePeriods> getSaleByProductId(
            @Param("productId") long productId,
            @Param("date") Date date
    );

    @Query("select s from SalePeriods s where s.startDate <= :date and s.endDate >= :date")
    Iterable<SalePeriods> findActiveSales(
            @Param("date") Date date
    );
}