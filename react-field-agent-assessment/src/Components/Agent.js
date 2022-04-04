import React, { useState } from "react";
import AgentForm from "./AgentForm";
import "./AgentList.css";

function Agent({ agents, removeAgent, updateAgent }) {
  const [edit, setEdit] = useState({
    id: null,
    value: ""
  });

  const submitUpdate = (value) => {
    updateAgent(edit.id, value);
    setEdit({
      id: null,
      value: ""
    });
  };

  if (edit.id) {
    return <AgentForm edit={edit} onSubmit={submitUpdate} />;
  }
  return agents.map((agent, index) => (
    <div className="agent-row">
      <div className="icons" key={index}>
        {/* <button
          type="submit"
          text=""
          onClick={() => removeAgent(agent.id)}
          className="delete-icon"
        >
          Delete
        </button>

        <button
          onClick={() => setEdit({ id: agent.id, value: agent.text })}
          className="edit-icon"
        >
          Update
        </button> */}
      </div>
    </div>
  ));
}

export default Agent;
