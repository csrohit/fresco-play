package repository;

import Model.ApplicationUser;
import org.springframework.data.jpa.repository.JpaRepository;




public interface ApplicationUserRepository  extends JpaRepository<ApplicationUser, String>{

}
