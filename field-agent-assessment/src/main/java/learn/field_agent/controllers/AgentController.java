package learn.field_agent.controllers;

import learn.field_agent.domain.AgentService;
import learn.field_agent.domain.AliasService;
import learn.field_agent.domain.Result;
import learn.field_agent.models.Agent;
import learn.field_agent.models.Alias;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/agent")
public class AgentController {

    private final AgentService service;
    private final AliasService aliasService;

    public AgentController(AgentService service, AliasService aliasService) {
        this.service = service;
        this.aliasService = aliasService;
    }

    @GetMapping
    public List<Agent> findAll() {
        return service.findAll();
    }

    @GetMapping("/{agentId}")
    public ResponseEntity<Object> findById(@PathVariable int agentId) {
       Agent agent = service.findById(agentId);
        if (agent == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<Alias> aliasList = service.findByAliasId(agent);
        agent.setAliases(aliasList);


        return ResponseEntity.ok(agent);
    }



    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Agent agent) {
        Result<Agent> result = service.add(agent);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{agentId}")
    public ResponseEntity<Object> update(@PathVariable int agentId, @RequestBody Agent agent) {
        if (agentId != agent.getAgentId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<Agent> result = service.update(agent);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{agentId}")
    public ResponseEntity<Void> deleteById(@PathVariable int agentId) {
        if (service.deleteById(agentId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
