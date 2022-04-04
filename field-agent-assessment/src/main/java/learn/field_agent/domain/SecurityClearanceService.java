package learn.field_agent.domain;

import learn.field_agent.data.AgencyAgentRepository;
import learn.field_agent.data.SecurityClearanceRepository;
import learn.field_agent.models.SecurityClearance;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SecurityClearanceService {

    private final SecurityClearanceRepository repository;
    private final AgencyAgentRepository agentAgencyRepository;

    public SecurityClearanceService(SecurityClearanceRepository repository, AgencyAgentRepository agentAgencyRepository) {
        this.repository = repository;
        this.agentAgencyRepository = agentAgencyRepository;
    }

    public List<SecurityClearance> findAll(){
        return repository.findAll();
    }

    public SecurityClearance findById(int securityClearanceId){
        return repository.findById(securityClearanceId);
    }

    public Result<SecurityClearance> add(SecurityClearance securityClearance){
        Result<SecurityClearance> result = validate(securityClearance);

        if (!result.isSuccess()){
            return result;
        }

        if (securityClearance.getSecurityClearanceId() != 0){
            result.addMessage("Security Clearance Id cannot be set for 'add' operation", ResultType.INVALID);
            return result;
        }

        securityClearance = repository.add(securityClearance);
        result.setPayload(securityClearance);
        return result;
    }

    public Result<SecurityClearance> update(SecurityClearance securityClearance){
        Result<SecurityClearance> result = validate(securityClearance);
        if (!result.isSuccess()){
            return result;
        }

        if (securityClearance.getSecurityClearanceId() <= 0){
            result.addMessage("security clearance Id must be set for 'update' operation", ResultType.INVALID);
            return result;
        }

        if (!repository.update(securityClearance)) {
            String msg = String.format("securityClearanceId: %s, not found", securityClearance.getSecurityClearanceId());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }
        return result;
    }

    // TODO NEED TO VALIDATE DELETE
    public boolean deleteById(int securityClearanceId) {

        boolean canUpdate = agentAgencyRepository.securityClearanceCheck(securityClearanceId);

        if (!canUpdate) {
            return false;
        } else {
            return repository.deleteById(securityClearanceId);

        }
    }

    private Result<SecurityClearance> validate(SecurityClearance securityClearance) {
        Result<SecurityClearance> result = new Result<>();
        List<SecurityClearance> securityClearances = repository.findAll();

        if (securityClearance == null) {
            result.addMessage("security clearance cannot be null", ResultType.INVALID);
            return result;
        }

        if (securityClearance.getName() == null
                || securityClearance.getName().trim().equalsIgnoreCase("")){
            result.addMessage("security clearance name cannot be empty",ResultType.INVALID);
            return result;

        }

        for (SecurityClearance s : securityClearances){
            if (securityClearance.getName().equalsIgnoreCase(s.getName())){
                result.addMessage("duplicate name", ResultType.INVALID);
                return result;
            }
        }

        return result;
    }

}
