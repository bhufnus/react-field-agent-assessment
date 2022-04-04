import React, { useState, useEffect } from "react";
import AgentList from "./AgentList";
import "./AgentList.css";
import AgentForm from "./AgentForm";

function UpdateForm({ handleUpdateTrue, handleUpdateFalse, id }) {
  const [agent, setAgent] = useState({
    agentId: 0,
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    heightInInches: 0
  });

  let agentId = id;

  useEffect(() => {
    fetch(`http://localhost:8080/api/agent/${agentId}`)
      .then((response) => {
        if (response.status !== 200) {
          return Promise.reject("agents fetch failed");
        }
        return response.json();
      })
      .then((json) => setAgent(json))
      .catch(console.log);
  }, []);

  const handleChange = (evt) => {
    let nextAgent = { ...agent };
    nextAgent[evt.target.name] = evt.target.value;
    setAgent(nextAgent);
    console.log(agent);
  };

  const verifyUpdate = (evt) => {
    console.log("verifying");
    console.log(agent);

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

    {
      handleUpdateTrue({ agent });
    }
  };

  return (
    <div className="update-agent">
      <h2 className="header">Update Agent</h2>
      <form>
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
      </form>
      <div>
        <button onClick={handleUpdateFalse} className="popup-cancel">
          Cancel
        </button>
        <button onClick={verifyUpdate} className="popup-confirm">
          Submit
        </button>
      </div>
    </div>
  );
}

export default UpdateForm;
