// import "../Styles.css";
// import { useState } from "react";
// import Axios from "axios";

// function App() {
//   const [date_created, setdate_created] = useState("");
//   const [date_modified, setdate_modified] = useState("");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [institution, setInstitution] = useState("");
//   const [position, setPosition] = useState("");
//   const [website, setWebsite] = useState("");
//   const [twitter, setTwitter] = useState("");
//   const [keywords, setKeywords] = useState("");

//   const [newInstitution, setNewInstitution] = useState("");

//   const [memberList, setMemberList] = useState([]);

//   const addMember = () => {
//     Axios.post("http://localhost:3001/create", {
//       date_created: date_created,
//       date_modified: date_modified,
//       name: name,
//       email: email,
//       institution: institution,
//       position: position,
//       website: website,
//       twitter: twitter,
//       keywords: keywords,
//     }).then(() => {
//       setMemberList([
//         ...memberList,
//         {
//           name: name,
//           email: email,
//           institution: institution,
//           position: position,
//           website: website,
//           twitter: twitter,
//           keywords: keywords,
//         },
//       ]);
//     });
//   };

//   const getMembers = () => {
//     Axios.get("http://localhost:3001/members").then((response) => {
//       setMemberList(response.data);
//     });
//   };

//   const updateMemberInstitution = (id) => {
//     Axios.put("http://localhost:3001/update", {
//       institution: newInstitution,
//       id: id,
//     }).then((response) => {
//       setMemberList(
//         memberList.map((val) => {
//           return val.Id === id
//             ? {
//                 id: val.Id,
//                 date_created: new Date(),
//                 date_modified: new Date()
//                   .toISOString()
//                   .slice(0, 19)
//                   .replace("T", " "),
//                 name: val.Name,
//                 email: val.Email,
//                 institution: newInstitution,
//                 position: val.Position,
//                 website: val.Website,
//                 twitter: val.Twitter,
//                 keywords: val.Keywords,
//               }
//             : val;
//         })
//       );
//     });
//   };

//   const deleteMember = (id) => {
//     Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
//       setMemberList(
//         memberList.filter((val) => {
//           return val.Id !== id;
//         })
//       );
//     });
//   };

//   return (
//     <div className="App">
//       <div className="information">
//         <label>Name:</label>
//         <input
//           type="text"
//           onChange={(event) => {
//             setName(event.target.value);
//           }}
//         />
//         <label>Email:</label>
//         <input
//           type="text"
//           onChange={(event) => {
//             setEmail(event.target.value);
//           }}
//         />
//         <label>Institution:</label>
//         <input
//           type="text"
//           onChange={(event) => {
//             setInstitution(event.target.value);
//           }}
//         />
//         <label>Position:</label>
//         <input
//           type="text"
//           onChange={(event) => {
//             setPosition(event.target.value);
//           }}
//         />
//         <label>Website (url):</label>
//         <input
//           type="text"
//           onChange={(event) => {
//             setWebsite(event.target.value);
//           }}
//         />
//         <label>Twitter (url):</label>
//         <input
//           type="text"
//           onChange={(event) => {
//             setTwitter(event.target.value);
//           }}
//         />
//         <label>Keywords (5):</label>
//         <input
//           type="text"
//           onChange={(event) => {
//             setKeywords(event.target.value);
//           }}
//         />
//         <button onClick={addMember}>Add Member</button>
//       </div>
//       <div className="members">
//         <button onClick={getMembers}>Show Members</button>
//         {memberList.map((val, key) => {
//           return (
//             <div key={val.Id} className="member">
//               <div>
//                 <h3>Name: {val.Name}</h3>
//                 <h3>Email: {val.Email}</h3>
//                 <h3>Institution: {val.Institution}</h3>
//                 <h3>Position: {val.Position}</h3>
//                 <h3>Website: {val.Website}</h3>
//                 <h3>Twitter: {val.Twitter}</h3>
//                 <h3>keywords: {val.Keywords}</h3>
//               </div>
//               <div>
//                 <input
//                   type="text"
//                   placeholder="2000..."
//                   onChange={(event) => {
//                     setNewInstitution(event.target.value);
//                   }}
//                 />
//                 <button
//                   onClick={() => {
//                     updateMemberInstitution(val.Id);
//                   }}
//                 >
//                   {" "}
//                   Update
//                 </button>

//                 <button
//                   onClick={() => {
//                     deleteMember(val.Id);
//                   }}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default App;

// ALT ALT
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Account, View, Home } from "./pages";
import "./Styles.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/Account" exact component={() => <Account />} />
          <Route path="/View" exact component={() => <View />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
