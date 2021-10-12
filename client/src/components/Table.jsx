import "../Styles.css";
import { useState } from "react";
import Axios from "axios";

function Table() {
  const [memberList, setMemberList] = useState([]);

  const getMembers = () => {
    Axios.get("http://localhost:3001/members").then((response) => {
      setMemberList(response.data);
    });
  };

  return (
    <div className="App">
      <div className="members">
        <button onClick={getMembers}>Show Members</button>
        {memberList.map((val, key) => {
          return (
            <div key={val.Id} className="member">
              <div>
                <h3>Name: {val.Name}</h3>
                <h3>Email: {val.Email}</h3>
                <h3>Institution: {val.Institution}</h3>
                <h3>Position: {val.Position}</h3>
                <h3>Website: {val.Website}</h3>
                <h3>Twitter: {val.Twitter}</h3>
                <h3>keywords: {val.Keywords}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Table;
