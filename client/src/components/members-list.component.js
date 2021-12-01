import React, { Component } from "react";
import MemberDataService from "../services/member.service";
import { Link } from "react-router-dom";

export default class MembersList extends Component {
  constructor(props) {
    super(props);
    this.retrieveMembers = this.retrieveMembers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveMember = this.setActiveMember.bind(this);
    // this.removeAllMembers = this.removeAllMembers.bind(this);

    this.state = {
      members: [],
      currentMember: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    this.retrieveMembers();
  }

  retrieveMembers() {
    MemberDataService.getAll()
      .then((response) => {
        this.setState({
          members: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveMembers();
    this.setState({
      currentMember: null,
      currentIndex: -1,
    });
  }

  setActiveMember(member, index) {
    this.setState({
      currentMember: member,
      currentIndex: index,
    });
  }

  // removeAllMembers() {
  //   MemberDataService.deleteAll()
  //     .then((response) => {
  //       console.log(response.data);
  //       this.refreshList();
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }

  render() {
    const { members, currentMember, currentIndex } = this.state;

    return (
      <div className="list row Content">
        <div className="col-md-6">
          <h4>Members List</h4>

          <ul className="list-group">
            {members &&
              members.map((member, index) => (
                <li
                  classNqame={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveMember(member, index)}
                  key={index}
                >
                  {member.name}
                </li>
              ))}
          </ul>

          {/* <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllMembers}
          >
            Remove All
          </button> */}
        </div>
        <div className="col-md-6">
          {currentMember ? (
            <div>
              <h4>Member</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentMember.name}
              </div>
              <div>
                <label>
                  <strong>email:</strong>
                </label>{" "}
                {currentMember.email}
              </div>

              <Link
                to={"/profile/" + currentMember.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a record...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
