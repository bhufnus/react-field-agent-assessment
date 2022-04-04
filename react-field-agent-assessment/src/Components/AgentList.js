import React, { useState, useEffect } from "react";
import FieldAgentForm from "../FieldAgentForm";
import AgentForm from "./AgentForm.js";
import Agent from "./Agent.js";
import "./AgentList.css";
import UpdateForm from "./UpdateForm";
import Popup from "./Popup";
import MoreInfo from "./MoreInfo";

function AgentList(props) {
  const [agents, setAgents] = useState([]);
  const [popup, setPopup] = useState({
    show: false,
    id: ""
  });
  const [update, setUpdate] = useState({
    show: false,
    id: ""
  });
  const [moreInfo, setMoreInfo] = useState({
    show: false,
    id: ""
  });

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

    // console.log(props.agent);
    // if (props.agent !== null) {
    //   addNewAgent();
    // }
  }, [agents]);

  const addAgent = (agent) => {
    // Add checks

    const newAgents = [agent, ...agents];
    setAgents(newAgents);

    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(agent)
    };

    fetch("http://localhost:8080/api/agent", init)
      .then((response) => {
        if (response.status !== 201) {
          return Promise.reject("response is not 200 OK");
        }
        return response.json();
      })
      .then((json) => setAgents([...agents, json]))
      .catch(console.log);
  };

  const handleInfo = (id) => {
    setMoreInfo({
      show: true,
      id
    });
  };

  const handleClose = () => {
    setMoreInfo({
      show: false,
      id: null
    });
  };

  const handleDelete = (id) => {
    setPopup({
      show: true,
      id
    });
  };

  const handleDeleteFalse = () => {
    setPopup({
      show: false,
      id: null
    });
  };

  const handleDeleteTrue = () => {
    console.log("delete true" + popup.id);
    if (popup.show && popup.id) {
      const removeArr = [...agents].filter((agent) => agent.id !== popup.id);
      setAgents(removeArr);

      fetch(`http://localhost:8080/api/agent/${popup.id}`, { method: "DELETE" })
        .then((response) => {
          if (response.status === 204) {
            setAgents(agents.filter((a) => a.agentId !== popup.id));
          } else if (response.status === 404) {
            return Promise.reject("agent not found");
          } else {
            return Promise.reject(
              `Delete failed with status: ${response.status}`
            );
          }
        })
        .catch(console.log);
    }

    setPopup({
      show: false,
      id: null
    });
  };

  const handleUpdate = (id) => {
    setUpdate({
      show: true,
      id
    });
  };

  const handleUpdateTrue = ({ agent }) => {
    console.log("Update true agent: " + agent.agentId);

    const init = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(agent)
    };

    fetch(`http://localhost:8080/api/agent/${agent.agentId}`, init)
      .then((response) => {
        if (response.status === 204) {
          console.log("should update");

          let newAgentList = agents.filter((a) => a.agentId !== update.id);
          newAgentList.push(agent);
          setAgents(newAgentList);

          return response;
        } else {
          return Promise.reject(
            `Update failed with status: ${response.status}`
          );
        }
      })

      .catch(console.log);

    setUpdate({
      show: false,
      id: null
    });
  };

  const handleUpdateFalse = () => {
    setUpdate({
      show: false,
      id: null
    });
  };

  return (
    <div>
      <table className="agent-table">
        <thead className="table-head">
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((a) => (
            <tr key={a.agentId}>
              <td>{a.agentId}</td>
              <td>{a.firstName}</td>
              <td>{a.lastName}</td>
              <td>
                <button onClick={() => handleDelete(a.agentId)}>Delete</button>
              </td>
              <td>
                <button onClick={() => handleUpdate(a.agentId)}>Update</button>
              </td>
              <td>
                <button onClick={() => handleInfo(a.agentId)}>More Info</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <AgentForm onSubmit={addAgent} />
      </div>
      <div>
        <Agent
          agents={agents}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
      </div>
      {popup.show && (
        <Popup
          handleDeleteTrue={handleDeleteTrue}
          handleDeleteFalse={handleDeleteFalse}
        />
      )}
      {moreInfo.show && <MoreInfo id={moreInfo.id} handleClose={handleClose} />}
      {update.show && (
        <UpdateForm
          id={update.id}
          handleUpdateTrue={handleUpdateTrue}
          handleUpdateFalse={handleUpdateFalse}
        />
      )}
    </div>
  );
}

export default AgentList;
