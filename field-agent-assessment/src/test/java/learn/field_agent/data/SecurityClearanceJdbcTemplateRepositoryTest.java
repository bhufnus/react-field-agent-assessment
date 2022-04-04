package learn.field_agent.data;

import learn.field_agent.models.Agent;
import learn.field_agent.models.SecurityClearance;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class SecurityClearanceJdbcTemplateRepositoryTest {

    final static int NEXT_ID = 2;

    @Autowired
    SecurityClearanceJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }




    @Test
    void shouldFindAll() {
        List<SecurityClearance> securityClearances = repository.findAll();
        assertNotNull(securityClearances);
    }


    @Test
    void shouldFindById() {
        SecurityClearance secret = new SecurityClearance(1, "Secret");
        SecurityClearance topSecret = new SecurityClearance(2, "Top Secret");

        SecurityClearance actual = repository.findById(1);
        assertEquals(secret, actual);

        actual = repository.findById(2);
        assertEquals(topSecret, actual);

        actual = repository.findById(3);
        assertEquals(null, actual);
    }

    @Test
    void shouldNotFindMissingId(){

        SecurityClearance actual = repository.findById(3);
        assertEquals(null, actual);

    }


    // TODO: Test doesn't know next ID that is added
    @Test
    void shouldAddSecurityClearance(){
        SecurityClearance securityClearance = makeSecurityClearance();
        SecurityClearance actual = repository.add(securityClearance);

        assertNotNull(actual);

//        assertEquals(NEXT_ID,securityClearance.getSecurityClearanceId());
        assertEquals(actual,securityClearance);

    }

    @Test
    void shouldUpdateSecurityClearance(){
        SecurityClearance securityClearance = new SecurityClearance();
        securityClearance.setSecurityClearanceId(2);
        securityClearance.setName("Test Update");

        assertTrue(repository.update(securityClearance));
    }

    @Test
    void shouldDeleteSecurityClearance(){

        System.out.println("Clearance: " + repository.findById(16));

        assertTrue(repository.deleteById(16));
        assertFalse(repository.deleteById(16));
    }



        SecurityClearance makeSecurityClearance(){
        SecurityClearance securityClearance = new SecurityClearance();
        securityClearance.setName("Super Secret Test");

        return securityClearance;
    }
}