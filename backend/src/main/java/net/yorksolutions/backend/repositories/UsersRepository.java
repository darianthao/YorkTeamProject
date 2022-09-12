package net.yorksolutions.backend.repositories;

import net.yorksolutions.backend.models.Users;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


//CrudRepository (CRUD) stands for - Create (Post), Read (Get), Update (Put), Delete (Delete).
@Repository
public interface UsersRepository extends CrudRepository <Users, Long> {
    List<Users> findByEmail (String email);
    //will be used to connect with product table later.

    List<Users> findByEmailAndPassword (String email, String password);
    //will be used to compare between username and password match.
}