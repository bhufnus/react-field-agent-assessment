package learn.field_agent.domain;

import learn.field_agent.data.SecurityClearanceRepository;
import learn.field_agent.models.SecurityClearance;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class SecurityClearanceServiceTest {

    @Autowired
    SecurityClearanceService service;

    @MockBean
    SecurityClearanceRepository repository;


    @Test
    void shouldFindById(){
        SecurityClearance expected = makeSecurityClearance();

        when(repository.findById(1)).thenReturn(expected);
        SecurityClearance actual = service.findById(1);

        assertEquals(expected,actual);
    }




    @Test
    void shouldNotAddNullNameOrId(){

        // null name
        SecurityClearance securityClearance = makeSecurityClearance();
        securityClearance.setName("");

        Result<SecurityClearance> result = service.add(securityClearance);
        assertEquals(ResultType.INVALID, result.getType());

        // valid name but id added
        securityClearance.setName("Updated Name");
        securityClearance.setSecurityClearanceId(2);
        result = service.add(securityClearance);
        assertEquals(ResultType.INVALID, result.getType());

    }

    @Test
    void shouldAddValid(){
        SecurityClearance expected = makeSecurityClearance();
        SecurityClearance arg = makeSecurityClearance();

        when(repository.add(arg)).thenReturn(expected);
        Result<SecurityClearance> result = service.add(arg);
        assertEquals(ResultType.SUCCESS, result.getType());
        assertEquals(expected, result.getPayload());

    }

    @Test
    void shouldNotAddDuplicate(){
        SecurityClearance securityClearance = new SecurityClearance();
        securityClearance.setName("test");
        Result<SecurityClearance> result = service.add(securityClearance);
        assertEquals(ResultType.SUCCESS, result.getType());

        SecurityClearance duplicateSecurityClearance = new SecurityClearance();
        securityClearance.setName("test");
        Result<SecurityClearance> result2 = service.add(duplicateSecurityClearance);
        assertEquals(ResultType.INVALID, result2.getType());


    }

    @Test
    void shouldUpdate(){
        SecurityClearance securityClearance = new SecurityClearance(5,"TEST");
        when(repository.update(securityClearance)).thenReturn(true);
        Result<SecurityClearance> actual = service.update(securityClearance);

        assertEquals(ResultType.SUCCESS, actual.getType());

    }

    @Test
    void shouldNotUpdateMissing(){
        SecurityClearance securityClearance = new SecurityClearance(26,"TEST");
        when(repository.update(securityClearance)).thenReturn(false);
        Result<SecurityClearance> actual = service.update(securityClearance);

        assertEquals(ResultType.NOT_FOUND, actual.getType());
    }

    @Test
    void shouldNotUpdateWhenInvalid(){
        SecurityClearance securityClearance = new SecurityClearance(26,"");
        Result<SecurityClearance> actual = service.update(securityClearance);
        assertEquals(ResultType.INVALID, actual.getType());

        securityClearance.setSecurityClearanceId(0);
        securityClearance.setName("test test");
        actual = service.update(securityClearance);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    SecurityClearance makeSecurityClearance(){
        SecurityClearance securityClearance = new SecurityClearance();
        securityClearance.setName("Super Secret Test");

        return securityClearance;
    }



}