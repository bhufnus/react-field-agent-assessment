import React, { useEffect, useState } from "react";
import("./AgentList.css");

function MoreInfo({ handleClose, id }) {
  const [agent, setAgent] = useState({
    // agentId: 0,
    // firstName: "",
    // middleName: "",
    // lastName: "",
    // dob: "",
    // heightInInches: 0
  });
  let agentId = id;

  //   console.log("ID: " + id);

  //   useEffect(() => {
  //     fetch(`http://localhost:8080/api/agent/${agentId}`)
  //       .then((response) => {
  //         if (response.status !== 200) {
  //           return Promise.reject("agents fetch failed");
  //         }
  //         return response.json();
  //       })
  //       .then((json) => setAgent(json))
  //       .catch(console.log);
  //   }, []);

  //   console.log("First name: " + agent.firstName);

  //   return (
  //     <div>
  //       <div>
  //         <table className="agent-table">
  //           <thead className="table-head">
  //             <tr>
  //               <th>ID</th>
  //               <th>First Name</th>
  //               <th>Last Name</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {agent.map((a) => (
  //               <tr key={a.agentId}>
  //                 <td>{a.agentId}</td>
  //                 <td>{a.firstName}</td>
  //                 <td>{a.lastName}</td>
  //               </tr>
  //             ))}
  //           </tbody>
  //         </table>
  //         <button onClick={handleClose} className="popup-cancel">
  //           Close
  //         </button>
  //       </div>
  //     </div>
  //   );

  return (
    <div className="more-info">
      <h1>Coming soon...</h1>
      <button onClick={handleClose} className="more-info-btn">
        {" "}
        Close
      </button>
    </div>
  );
}

export default MoreInfo;
