// Table.js
import React, { Component } from "react";
import MemberDataService from "../services/member.service";
import { Link } from "react-router-dom";

export default class MembersList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchKeyword = this.onChangeSearchKeyword.bind(this);
    this.retrieveMembers = this.retrieveMembers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.searchKeyword = this.searchKeyword.bind(this);

    this.state = {
      members: [],
      currentMember: null,
      currentIndex: -1,
      searchKeyword: "",
    };
  }

  componentDidMount() {
    this.retrieveMembers();
  }

  onChangeSearchKeyword(e) {
    const searchKeyword = e.target.value;

    this.setState({
      searchKeyword: searchKeyword,
    });
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

  searchKeyword() {
    this.setState({
      currentMember: null,
      currentIndex: -1,
    });

    MemberDataService.findByKeyword(this.state.searchKeyword)
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

  render() {
    const { searchKeyword, members } = this.state;

    return (
      <div className="Content">
        <div>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by keyword"
              value={searchKeyword}
              onChange={this.onChangeSearchKeyword}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchKeyword}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <div>
          <table className="Table">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Institution</th>
              <th>Position</th>
              <th>Website</th>
              <th>Twitter</th>
              <th>Keywords</th>
            </tr>

            {members &&
              members.map((member) => (
                <tr>
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                  <td>{member.institution}</td>
                  <td>{member.position}</td>
                  <td>
                    {member.website !== "" ? (
                      <a
                        className="fas fa-globe-americas table-button"
                        href={member.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {" "}
                      </a>
                    ) : (
                      ""
                    )}
                  </td>
                  <td>
                    {member.twitter !== "" ? (
                      <a
                        className="fab fa-twitter-square table-button"
                        href={member.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {" "}
                      </a>
                    ) : (
                      ""
                    )}
                  </td>
                  <td>{member.keywords}</td>
                </tr>
              ))}
          </table>
        </div>
      </div>
    );
  }
}

