import React, { Component } from "react";
import MemberDataService from "../services/member.service";

export default class AddMember extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeInstitution = this.onChangeInstitution.bind(this);
    this.onChangePosition = this.onChangePosition.bind(this);
    this.onChangeWebsite = this.onChangeWebsite.bind(this);
    this.onChangeTwitter = this.onChangeTwitter.bind(this);
    this.onChangeKeywords = this.onChangeKeywords.bind(this);

    this.saveMember = this.saveMember.bind(this);
    this.newMember = this.newMember.bind(this);

    this.state = {
      id: null,
      name: "",
      email: "",
      institution: "",
      position: "",
      website: "",
      twitter: "",
      keywords: "",
      submitted: false,
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangeInstitution(e) {
    this.setState({
      institution: e.target.value,
    });
  }

  onChangePosition(e) {
    this.setState({
      position: e.target.value,
    });
  }

  onChangeWebsite(e) {
    this.setState({
      website: e.target.value,
    });
  }

  onChangeTwitter(e) {
    this.setState({
      twitter: e.target.value,
    });
  }

  onChangeKeywords(e) {
    this.setState({
      keywords: e.target.value,
    });
  }

  saveMember() {
    var data = {
      name: this.state.name,
      email: this.state.email,
      institution: this.state.institution,
      position: this.state.position,
      website: this.state.website,
      twitter: this.state.twitter,
      keywords: this.state.keywords,
    };

    MemberDataService.create(data)
      .then((response) => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          institution: response.data.institution,
          position: response.data.position,
          website: response.data.website,
          twitter: response.data.twitter,
          keywords: response.data.keywords,

          submitted: true,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newMember() {
    this.setState({
      id: null,
      name: "",
      email: "",
      institution: "",
      position: "",
      website: "",
      twitter: "",
      keywords: "",

      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form Content">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newMember}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                required
                value={this.state.email}
                onChange={this.onChangeEmail}
                name="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="institution">Institution</label>
              <input
                type="text"
                className="form-control"
                id="institution"
                required
                value={this.state.institution}
                onChange={this.onChangeInstitution}
                name="institution"
              />
            </div>

            <div className="form-group">
              <label htmlFor="position">Position</label>
              <input
                type="text"
                className="form-control"
                id="position"
                required
                value={this.state.position}
                onChange={this.onChangePosition}
                name="position"
              />
            </div>

            <div className="form-group">
              <label htmlFor="website">Website</label>
              <input
                type="text"
                className="form-control"
                id="website"
                required
                value={this.state.website}
                onChange={this.onChangeWebsite}
                name="website"
              />
            </div>

            <div className="form-group">
              <label htmlFor="twitter">Twitter</label>
              <input
                type="text"
                className="form-control"
                id="twitter"
                required
                value={this.state.twitter}
                onChange={this.onChangeTwitter}
                name="twitter"
              />
            </div>

            <div className="form-group">
              <label htmlFor="keywords">Keywords</label>
              <input
                type="text"
                className="form-control"
                id="keywords"
                required
                value={this.state.keywords}
                onChange={this.onChangeKeywords}
                name="keywords"
              />
            </div>

            <button onClick={this.saveMember} className="btn btn-success">
              Create
            </button>
          </div>
        )}
      </div>
    );
  }
}
