package learn.field_agent.domain;

import learn.field_agent.data.AgentRepository;
import learn.field_agent.data.AliasRepository;
import learn.field_agent.models.Agent;
import learn.field_agent.models.Alias;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class AliasService {

    private final AliasRepository aliasRepository;
    private final AgentRepository agentRepository;


    public AliasService(AliasRepository repository, AgentRepository agentRepository) {
        this.aliasRepository = repository;
        this.agentRepository = agentRepository;
    }

    public List<Alias> findAll(){
        return aliasRepository.findAll();
    }

    public List<Alias> findAliasByAgentId(int agentId){
        return aliasRepository.findAliasByAgentId(agentId);
    }

    public Result<Alias> add(Alias alias){
        Result<Alias> result = validate(alias);
        if (!result.isSuccess()){
            return result;
        }

        if (alias.getAliasId() != 0){
            result.addMessage("alias Id cannot be set for 'add' operation", ResultType.INVALID);
            return result;
        }

        alias = aliasRepository.add(alias);
        result.setPayload(alias);
        return result;

    }

    public Result<Alias> update(Alias alias){
        Result<Alias> result = validate(alias);

        if (!result.isSuccess()){
            return result;
        }

        if (alias.getAliasId() <= 0){
            result.addMessage("aliasId must be set for 'update' operation", ResultType.INVALID);
            return result;
        }

        if (!aliasRepository.update(alias)){
            String msg = String.format("aliasId: %s not found", alias.getAliasId());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }

        return result;
    }

    public boolean deleteById(int aliasId){
        return aliasRepository.deleteById(aliasId);
    }


    private Result<Alias> validate(Alias alias) {
        Result<Alias> result = new Result<>();
        Agent agent = agentRepository.findById(alias.getAgentId());
        List<Alias> aliasList = aliasRepository.findAll();


        if (alias == null) {
            result.addMessage("cannot add null alias", ResultType.INVALID);
            return result;
        }

        if (Validations.isNullOrBlank(alias.getName())) {
            result.addMessage("name is required", ResultType.INVALID);
        }

        if (alias.getAgentId() <= 0) {
            result.addMessage("agent id is required", ResultType.INVALID);
        }

        if (agent == null){
            result.addMessage("no agent found with given agent Id",ResultType.NOT_FOUND);
        }


        for (Alias a : aliasList){
            if (alias.getName().equalsIgnoreCase(a.getName())
                    && alias.getPersona().equalsIgnoreCase(a.getPersona())){
                result.addMessage("Duplicate alias. " +
                        "Change persona to distinguish from existing alias.", ResultType.INVALID);
                return result;
            }
        }

        return result;
    }
}
