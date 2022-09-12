package net.yorksolutions.backend.repositories;

import net.yorksolutions.backend.models.CouponPeriods;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface CouponPeriodsRepository extends CrudRepository<CouponPeriods, Long> {

    @Query("select c from CouponPeriods c where c.couponCode like :couponCode and  c.startDate <= :date and c.endDate >= :date")
    List<CouponPeriods> validateCoupon(
            @Param("couponCode") String couponCode,
            @Param("date") Date date
    );

    @Query("select c from CouponPeriods c where c.couponCode like :code")
    List<CouponPeriods> findBycouponCode(
            @Param("code") String code
    );

    @Query("select c from CouponPeriods c where c.startDate <= :date and c.endDate >= :date")
    List<CouponPeriods> findActiveCoupons(
            @Param("date") Date date
    );
}