import "./App.css";
import FieldAgentForm from "./FieldAgentForm";

import AgentFetch from "./AgentFetch";
import React, { useState } from "react";
import AgentList from "./Components/AgentList";

function App() {
  const [agent, setAgent] = useState(null);

  const handleNewAgent = (agent) => {
    setAgent(agent);
  };

  return (
    <main>
      <div className="App">
        <h1>Field Agents</h1>
        {/* <AgentFetch agent={agent} />
        <FieldAgentForm handleNewAgent={handleNewAgent} /> */}
        <AgentList />
      </div>
    </main>
  );
}

export default App;
