package learn.field_agent.domain;

import learn.field_agent.data.AliasRepository;
import learn.field_agent.models.Alias;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class AliasServiceTest {

    @Autowired
    AliasService service;
    @MockBean
    AliasRepository repository;

    @Test
    void shouldAddValid(){
        Alias alias = makeAlias();
        Result<Alias> result = service.add(alias);
        assertEquals(ResultType.SUCCESS, result.getType());

        // Empty persona is ok
        alias.setPersona("");
        result = service.add(alias);
        assertEquals(ResultType.SUCCESS, result.getType());
    }

    @Test
    void shouldNotAddInvalid(){
        // non-matching agent id
        Alias alias = makeAlias();
        alias.setAgentId(29);
        Result<Alias> result = service.add(alias);
        assertEquals(ResultType.NOT_FOUND,result.getType());

        // empty name
        alias.setName("");
        alias.setAgentId(1);
        result = service.add(alias);
        assertEquals(ResultType.INVALID,result.getType());
    }

    @Test
    void shouldUpdate(){
        Alias alias = makeAlias();
        alias.setAliasId(1);
        when(repository.update(alias)).thenReturn(true);
        Result<Alias> actual = service.update(alias);
        assertEquals(ResultType.SUCCESS,actual.getType());

        when(repository.update(alias)).thenReturn(false);
        actual = service.update(alias);
        assertEquals(ResultType.NOT_FOUND,actual.getType());

    }

    // TODO: delete tests, more update tests

    // TODO: duplicate aliases apparently go through
//    @Test
//    void shouldNotAddDuplicateAlias(){
//        Alias alias = new Alias();
//        alias.setName("alias");
//        alias.setAgentId(1);
//        Result<Alias> result = service.add(alias);
//        assertEquals(ResultType.SUCCESS,result.getType());
//
//        Alias duplicateAlias = new Alias();
//        alias.setName("alias");
//        alias.setAgentId(1);
//        assertEquals(ResultType.INVALID,result.getType());
//    }


    Alias makeAlias(){
        Alias alias = new Alias();
        alias.setName("Jim Johnson");
        alias.setPersona("Big guy with a happy attitude");
        alias.setAgentId(1);
        return alias;
    }

}