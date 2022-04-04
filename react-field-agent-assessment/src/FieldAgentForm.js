import React, { useState, useEffect } from "react";
import AgentFetch from "./AgentFetch";
import "./App.css";

const DEMO_AGENT = {
  id: 100,
  firstName: "Bill",
  lastName: "Nye",
  dob: "2003-11-02",
  heightInInches: 88
};

function FieldAgentForm({ initialAgent = DEMO_AGENT, handleNewAgent }) {
  const [agent, setAgent] = useState(initialAgent);

  const [agents, setAgents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/agent")
      .then((response) => {
        if (response.status !== 200) {
          return Promise.reject("agents fetch failed");
        }
        return response.json();
      })
      .then((json) => setAgents(json))
      .catch(console.log);
  }, []);

  const handleChange = function (evt) {
    let nextAgent = { ...agent };
    nextAgent[evt.target.name] = evt.target.value;
    setAgent(nextAgent);
    console.log(nextAgent);
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    let nextAgent = { ...agent };
    nextAgent[evt.target.name] = evt.target.value;
    setAgent(nextAgent);
    handleNewAgent(nextAgent);
  }

  return (
    <form onSubmit={handleSubmit} className="add-agent">
      <div>
        <h2>Add an Agent</h2>
      </div>
      <div className="add-entry">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          placeholder="first name"
          id="name"
          name="firstName"
          value={agent.firstName}
          onChange={handleChange}
        />
      </div>
      <div className="add-entry">
        <label htmlFor="middleName">Middle Name</label>
        <input
          type="text"
          placeholder="middle name"
          id="name"
          name="middleName"
          value={agent.middleName}
          onChange={handleChange}
        />
      </div>
      <div className="add-entry">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          placeholder="last name"
          id="name"
          name="lastName"
          value={agent.lastName}
          onChange={handleChange}
        />
      </div>
      <div className="add-entry">
        <label htmlFor="dob">Date of Birth</label>
        <input
          type="text"
          placeholder="date of birth"
          id="dob"
          name="dob"
          value={agent.dob}
          onChange={handleChange}
        />
      </div>
      <div className="add-entry">
        <label htmlFor="heightInInches">Height in Inches</label>
        <input
          type="number"
          placeholder="height in inches"
          id="heightInInches"
          name="heightInInches"
          value={agent.heightInInches}
          onChange={handleChange}
        />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default FieldAgentForm;
