package learn.field_agent.data;

import learn.field_agent.domain.Result;
import learn.field_agent.models.Alias;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class AliasJdbcTemplateRepositoryTest {

    @Autowired
    AliasJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup(){
        knownGoodState.set();
    }


    @Test
    void shouldFindById(){
        Alias alias = repository.findById(1);
        assertEquals(1,alias.getAliasId());
    }

    @Test
    void shouldFindAliasByAgentId(){
        List<Alias> aliases = repository.findAliasByAgentId(1);
        assertEquals(2,aliases.size());

    }

    @Test
    void shouldFindAll(){
        List<Alias> aliasList = repository.findAll();
        assertNotNull(aliasList);

        assertEquals(3,aliasList.size());
    }

    @Test
    void shouldAdd(){
        Alias alias = makeAlias();
        Alias actual = repository.add(alias);
        assertNotNull(actual);

    }

    // TODO this might assert True no matter what
    @Test
    void shouldUpdate(){
        Alias alias = makeAlias();
        alias.setAliasId(3);
        assertTrue(repository.update(alias));
//
//        alias.setAliasId(13);
//        assertFalse(repository.update(alias));

    }

    @Test
    void shouldDelete(){
        assertTrue(repository.deleteById(2));
        assertFalse(repository.deleteById(2));
    }



    private Alias makeAlias(){
        Alias alias = new Alias();
        alias.setName("James Bond");
        alias.setPersona("Charming");
        alias.setAgentId(1);
        return alias;
    }




}