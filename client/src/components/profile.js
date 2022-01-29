import React, { Component } from "react";
import MemberDataService from "../services/member.service";

export default class Member extends Component {
  constructor(props) {
    // If not logged in, redirect back home
    if (!localStorage.getItem("loginData")) {
      window.location.href = "/";
    }

    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeInstitution = this.onChangeInstitution.bind(this);
    this.onChangePosition = this.onChangePosition.bind(this);
    this.onChangeWebsite = this.onChangeWebsite.bind(this);
    this.onChangeTwitter = this.onChangeTwitter.bind(this);
    this.onChangeKeywords = this.onChangeKeywords.bind(this);
    this.getMember = this.getMember.bind(this);
    this.updateMember = this.updateMember.bind(this);
    this.deleteMember = this.deleteMember.bind(this);

    this.state = {
      currentMember: {
        gid: "",
        name: "",
        email: "",
        institution: "",
        position: "",
        website: "",
        twitter: "",
        keywords: "",
        visible: false,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getMember(JSON.parse(localStorage.getItem("loginData")).sub);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function (prevState) {
      return {
        currentMember: {
          ...prevState.currentMember,
          name: name,
        },
      };
    });
  }

  onChangeEmail(e) {
    const email = e.target.value;

    this.setState(function (prevState) {
      return {
        currentMember: {
          ...prevState.currentMember,
          email: email,
        },
      };
    });
  }

  onChangeInstitution(e) {
    const institution = e.target.value;

    this.setState(function (prevState) {
      return {
        currentMember: {
          ...prevState.currentMember,
          institution: institution,
        },
      };
    });
  }

  onChangePosition(e) {
    const position = e.target.value;

    this.setState(function (prevState) {
      return {
        currentMember: {
          ...prevState.currentMember,
          position: position,
        },
      };
    });
  }

  onChangeWebsite(e) {
    const website = e.target.value;

    this.setState(function (prevState) {
      return {
        currentMember: {
          ...prevState.currentMember,
          website: website,
        },
      };
    });
  }

  onChangeTwitter(e) {
    const twitter = e.target.value;

    this.setState(function (prevState) {
      return {
        currentMember: {
          ...prevState.currentMember,
          twitter: twitter,
        },
      };
    });
  }

  onChangeKeywords(e) {
    const keywords = e.target.value;

    this.setState(function (prevState) {
      return {
        currentMember: {
          ...prevState.currentMember,
          keywords: keywords,
        },
      };
    });
  }

  getMember(gid) {
    MemberDataService.get(gid)
      .then((response) => {
        this.setState({
          currentMember: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  // Check to see if all required fields are filled in
  checkRequired() {
    const nm = this.state.currentMember.name;
    const em = this.state.currentMember.email;
    const it = this.state.currentMember.institution;
    const ps = this.state.currentMember.position;
    const kw = this.state.currentMember.keywords;

    if (nm == "" || nm == " ") {
      return false;
    } else if (em == "" || em == " ") {
      return false;
    } else if (it == "" || it == " ") {
      return false;
    } else if (ps == "" || ps == " ") {
      return false;
    } else if (kw == "" || kw == " ") {
      return false;
    } else {
      return true;
    }
  }

  checkWebsite() {
    const website = this.state.currentMember.website;

    if (website == "") {
      return true;
    } else if (website.startsWith("http")) {
      return true;
    } else {
      return false;
    }
  }

  checkTwitter() {
    const twitter = this.state.currentMember.twitter;

    if (twitter == "") {
      return true;
    } else if (twitter.startsWith("https://twitter.com")) {
      return true;
    } else {
      return false;
    }
  }

  updateMember() {
    const isVisible = this.checkRequired(); // check all required fields are filled
    this.state.currentMember.visible = isVisible;
    const validWebsite = this.checkWebsite(); // check website url is *probably* valid
    const validTwitter = this.checkTwitter(); // check twitter url is *probably* valid

    if (!isVisible) {
      alert(
        "Some required fields are missing! Your profile will not be visible to others until all required fields are filled."
      );
    }

    if (!validWebsite) {
      this.state.currentMember.website = "";
      alert("Website URL must be of the form 'http...'");
    }

    if (!validTwitter) {
      this.state.currentMember.twitter = "";
      alert("Twitter URL must be of the form 'https://twitter.com/...'");
    }

    MemberDataService.update(
      this.state.currentMember.gid,
      this.state.currentMember
    )
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "Your profile has been updated",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteMember() {
    // Delete this member from the table
    MemberDataService.delete(this.state.currentMember.gid)
      .then((response) => {
        console.log(response.data);
        this.props.history.push("/Members");
      })
      .catch((e) => {
        console.log(e);
      });
    // Reirect user back to home page
    window.location.href = "/";
  }

  render() {
    const { currentMember } = this.state;

    return (
      <div className="Content form">
        <p className="form-hello">
          Hello, {JSON.parse(localStorage.getItem("loginData")).given_name}
        </p>
        <div className="edit-form">
          <form>
            <div className="form-group">
              <label htmlFor="name">Name*</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={currentMember.name}
                onChange={this.onChangeName}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email*</label>
              <input
                type="text"
                className="form-control"
                id="email"
                value={currentMember.email}
                onChange={this.onChangeEmail}
              />
            </div>

            <div className="form-group">
              <label htmlFor="institution">Institution*</label>
              <input
                type="text"
                className="form-control"
                id="institution"
                value={currentMember.institution}
                onChange={this.onChangeInstitution}
              />
            </div>

            <div className="form-group">
              <label htmlFor="position">Position*</label>
              <input
                type="text"
                className="form-control"
                id="position"
                value={currentMember.position}
                onChange={this.onChangePosition}
              />
            </div>

            <div className="form-group">
              <label htmlFor="website">Website URL (optional)</label>
              <input
                type="text"
                className="form-control"
                id="website"
                value={currentMember.website}
                onChange={this.onChangeWebsite}
              />
            </div>

            <div className="form-group">
              <label htmlFor="twitter">Twitter URL (optional)</label>
              <input
                type="text"
                className="form-control"
                id="twitter"
                value={currentMember.twitter}
                onChange={this.onChangeTwitter}
              />
            </div>

            <div className="form-group">
              <label htmlFor="keywords">Keywords*</label>
              <input
                type="text"
                className="form-control"
                id="keywords"
                value={currentMember.keywords}
                onChange={this.onChangeKeywords}
              />
            </div>
          </form>

          <div className="btn-container-profile">
            <button
              type="submit"
              // className="badge badge-success"
              class="btn btn-outline-primary"
              onClick={this.updateMember}
            >
              Update Profile
            </button>

            <button
              // className="badge badge-danger mr-2"
              class="btn btn-outline-danger"
              onClick={this.deleteMember}
            >
              Delete Profile
            </button>
          </div>

          <p>{this.state.message}</p>
        </div>
      </div>
    );
  }
}
