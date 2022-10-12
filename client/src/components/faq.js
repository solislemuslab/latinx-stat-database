import React, { Component } from "react";

export default class FAQ extends Component {
	render() {
		return (
			<div class="Content">
				<h1>FAQ</h1>
				<h4>What is the purpose of the database?</h4>
				<p>
					The purpose of the database is to compile a list of
					scientists that identify as Latinx and that work in the
					fields of Statistics, Data Science or Machine Learning. We
					hope that such database could aid conference organizers to
					increase diversity in the representation of speakers.
				</p>
				<h4>
					I have filled out my profile, but I still do not appear in
					the database, why?
				</h4>
				<p>
					It can take up to a week for us to approve profiles. We
					appreciate your patience. Also, make sure that you have
					included your <strong>name</strong>, <strong>email</strong>, <strong>institution</strong>,
          and informative <strong>keywords</strong>, as profiles without these 4 items
					will not be approved. Email addresses are protected from
					mining, but you may also write it as
					name[AT]wherever[DOT]edu. Make sure that your keywords are
					informative (e.g. single keyword “statistics” is not enough
					information to serve the purpose of the database).
				</p>
				<h4>How do I update my profile?</h4>
				<p>
					You can always login with the Google account you used to
					create your profile and modify your information. Just as
					when filling out the profile for the first time, it will
					take us about one week to approve any changes.
				</p>
				<h4>
					Why do profiles have to be approved?
				</h4>
				<p>
					The approval process guarantee that the database is not used
					maliciously as a place to include hateful or discriminatory
					messages.
				</p>
			</div>
		);
	}
}
