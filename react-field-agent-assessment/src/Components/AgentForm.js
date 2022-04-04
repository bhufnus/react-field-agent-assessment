import React, { useState } from "react";
import AgentList from "./AgentList";
import "./AgentList.css";

function AgentForm(props) {
  const [agent, setAgent] = useState(props.edit ? props.edit.value : "");

  //   const [firstName, setFirstName] = useState("");
  //   const [middleName, setMiddleName] = useState("");
  //   const [lastName, setLastName] = useState("");
  //   const [dob, setDob] = useState("");

  const handleChange = (evt) => {
    let nextAgent = { ...agent };
    nextAgent[evt.target.name] = evt.target.value;
    setAgent(nextAgent);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    // return error
    if (!agent.firstName || /^\s*$/.test(agent.firstName)) {
      return window.alert("First name cannot be empty");
    }

    if (!agent.lastName || /^\s*$/.test(agent.lastName)) {
      return window.alert("Last name cannot be empty");
    }

    if (!agent.dob || /^\s*$/.test(agent.dob)) {
      return window.alert("Date of birth cannot be empty");
    }

    if (!agent.heightInInches || /^\s*$/.test(agent.heightInInches)) {
      return window.alert("Height in inches cannot be empty");
    }

    let nextAgent = { ...agent };
    nextAgent[evt.target.name] = evt.target.value;
    setAgent(nextAgent);
    console.log(nextAgent);

    props.onSubmit({
      agentId: nextAgent.agentId,
      firstName: nextAgent.firstName,
      middleName: nextAgent.middleName,
      lastName: nextAgent.lastName,
      dob: nextAgent.dob,
      heightInInches: nextAgent.heightInInches
    });
  };

  return (
    <form onSubmit={handleSubmit} className="add-agent">
      <div>
        <h2>Add an Agent</h2>
      </div>
      <div className="add-entry">
        <label htmlFor="firstName" className="entry-label">
          First Name
        </label>
        <input
          type="text"
          className="entry-text"
          placeholder="first name"
          id="name"
          name="firstName"
          value={agent.firstName}
          onChange={handleChange}
        />
      </div>
      <div className="add-entry">
        <label htmlFor="middleName" className="entry-label">
          Middle Name
        </label>
        <input
          type="text"
          className="entry-text"
          placeholder="middle name"
          id="name"
          name="middleName"
          value={agent.middleName}
          onChange={handleChange}
        />
      </div>
      <div className="add-entry">
        <label htmlFor="lastName" className="entry-label">
          Last Name
        </label>
        <input
          type="text"
          className="entry-text"
          placeholder="last name"
          id="name"
          name="lastName"
          value={agent.lastName}
          onChange={handleChange}
        />
      </div>
      <div className="add-entry">
        <label htmlFor="dob" className="entry-label">
          Date of Birth
        </label>
        <input
          type="date"
          className="entry-text"
          placeholder="date of birth"
          id="dob"
          name="dob"
          value={agent.dob}
          onChange={handleChange}
        />
      </div>
      <div className="add-entry">
        <label htmlFor="heightInInches" className="entry-label">
          Height in Inches
        </label>
        <input
          type="number"
          className="entry-text"
          placeholder="height in inches"
          id="heightInInches"
          name="heightInInches"
          value={agent.heightInInches}
          onChange={handleChange}
        />
      </div>
      <div>
        <button type="submit" className="btn">
          Submit
        </button>
      </div>
    </form>
  );
}

export default AgentForm;
