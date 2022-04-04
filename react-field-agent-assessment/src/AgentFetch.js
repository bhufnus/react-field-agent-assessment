import React, { useState, useEffect } from "react";
import "./App.css";
import FieldAgentForm from "./FieldAgentForm";

function AgentFetch(props) {
  const [agents, setAgents] = useState([]);
  const [edit, setEdit] = useState({
    id: null,
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    heightInInches: 0
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
    if (props.agent !== null) {
      addNewAgent();
    }
  }, [props.agent]);

  ///// UPDATE ////////

  // const submitUpdate = (value) => {
  //   updateAgent(edit.id, firstName, middleName, lastName, dob, heightInInches);
  //   setEdit({
  //     id: null,
  //     firstName: "",
  //     middleName: "",
  //     lastName: "",
  //     dob: "",
  //     heightInInches: 0
  //   });
  // };

  // const updateAgent = (
  //   agentId,
  //   newFirstName,
  //   newMiddleName,
  //   newLastName,
  //   newDob,
  //   newHeight
  // ) => {
  //   setAgents((prev) => prev.map((item) => item.id === agentId));
  // };

  // if (edit.id) {
  //   return <FieldAgentForm edit={edit} onSubmit={submitUpdate} />;
  // }

  ////////// RANDOM AGENT BUTTON ////////////////
  const add = () => {
    const agent = {
      id: `${Math.floor(Math.random() * 10000)}`,
      firstName: "Jack",
      middleName: "C",
      lastName: "Daniels",
      dob: "2001-01-10",
      heightInInches: 88
    };

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

  /////////////////////////////////////////////////////////////////////////////

  const addNewAgent = () => {
    console.log(props.agent);

    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(props.agent)
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

  const deleteById = (agentId) => {
    fetch(`http://localhost:8080/api/agent/${agentId}`, { method: "DELETE" })
      .then((response) => {
        if (response.status === 204) {
          setAgents(agents.filter((a) => a.agentId !== agentId));
        } else if (response.status === 404) {
          return Promise.reject("agent not found");
        } else {
          return Promise.reject(
            `Delete failed with status: ${response.status}`
          );
        }
      })
      .catch(console.log);
  };

  // const updateById = (agentId) => {
  //   fetch(`http://localhost:8080/api/agent/${agentId}`, { method: "PUT" })
  //     .then((response) => {
  //       if (response.status === 204) {
  //         setAgents(agents.filter((a) => a.agentId != agentId));
  //       } else if (response.status === 404) {
  //         return Promise.reject("agent not found");
  //       } else {
  //         return Promise.reject(
  //           `Delete failed with status: ${response.status}`
  //         );
  //       }
  //     })
  //     .catch(console.log);
  // };

  return (
    <div>
      <button onClick={add}>Add Random Agent</button>

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
                <button onClick={() => deleteById(a.agentId)}>Delete</button>
              </td>
              <td>
                <button onClick={() => deleteById(a.agentId)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AgentFetch;
