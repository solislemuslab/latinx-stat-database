import React, { Component } from "react";
import MemberDataService from "../services/member.service";

export default class Member extends Component {
  constructor(props) {
    // If not logged in, redirect back home
    if (!localStorage.getItem("loginData")) {
      window.location.href = "/";
    }

    // If user is not admin, redirect back home
    if (JSON.parse(localStorage.getItem("loginData")).sub != "112570682828656133985") {
      window.location.href = "/";
    }

    super(props);

    this.retrieveNotApprovedMembers = this.retrieveNotApprovedMembers.bind(this);
    this.retrieveApprovedMembers = this.retrieveApprovedMembers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.approveMember = this.approveMember.bind(this);
    this.unapproveMember = this.unapproveMember.bind(this);
    this.deleteMember = this.deleteMember.bind(this);

    this.state = {
      notApprovedMembers: [],
      approvedMembers: [],
      currentMember: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    this.retrieveNotApprovedMembers();
    this.retrieveApprovedMembers();
  }

  deleteMember(member) {
    MemberDataService.delete(member.gid)
      .then((response) => {
        window.location.href = "/admin";
      })
      .catch((e) => {
        console.log(e);
      });
  }

  approveMember(member) {
    member.approved = true;
    MemberDataService.update(member.gid, member)
      .then((response) => {
        window.location.href = "/admin";
      })
      .catch((e) => {
        console.log(e);
      });
  }

  unapproveMember(member) {
    member.approved = false;
    MemberDataService.update(member.gid, member)
      .then((response) => {
        window.location.href = "/admin";
      })
      .catch((e) => {
        console.log(e);
      });
  }

  retrieveNotApprovedMembers() {
    this.setState({
      currentMember: null,
      currentIndex: -1,
    });

    MemberDataService.getNotApproved()
      .then((response) => {
        this.setState({
          notApprovedMembers: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  retrieveApprovedMembers() {
    this.setState({
      currentMember: null,
      currentIndex: -1,
    });

    MemberDataService.getApproved()
      .then((response) => {
        this.setState({
          approvedMembers: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveNotApprovedMembers();
    this.setState({
      currentMember: null,
      currentIndex: -1,
    });
  }

  render() {
    const { notApprovedMembers, approvedMembers } = this.state;

    return (
      <div className="Content">
        {notApprovedMembers.length != 0 ? ( 
          <h3>
            Unapproved Members
          </h3>
        ) : (
          ""
        )}
        <table className="Table">
          {
            notApprovedMembers &&
            notApprovedMembers.map((member) => (
              <tr>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>{member.institution}</td>
                <td>{member.keywords}</td>
                <td>
                  <button
                    class="btn btn-outline-warning"
                    onClick={this.approveMember.bind(this, member)}
                  >
                    Approve
                  </button>
                </td>
                <td>
                  <button
                    class="btn btn-outline-danger"
                    onClick={this.deleteMember.bind(this, member)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          }
        </table>
        {approvedMembers.length != 0 ? ( 
          <h3>
            Approved Members
          </h3>
        ) : (
          ""
        )}
        <table className="Table">
        {
          approvedMembers &&
          approvedMembers.map((member) => (
            <tr>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.institution}</td>
              <td>{member.keywords}</td>
              <td>
                <button
                  class="btn btn-outline-warning"
                  onClick={this.unapproveMember.bind(this, member)}
                >
                  Unapprove
                </button>
              </td>
              <td>
                <button
                  class="btn btn-outline-danger"
                  onClick={this.deleteMember.bind(this, member)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        }
        </table>
      </div>
    );
  }
}
