import "../Styles.css";
import { useState } from "react";
import Axios from "axios";

function DisplayRecord() {
  const [memberList, setMemberList] = useState([]);

  const getRecord = () => {
    Axios.get("http://localhost:3001/record").then((response) => {
      setMemberList(response.data);
    });
  };

  return (
    <div className="App">
      <div className="record">
        <button onClick={getRecord}>Show Record</button>
        {memberList.map((val, key) => {
          return (
            <div key={val.Id} className="record">
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

export default DisplayRecord;
