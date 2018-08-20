import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import ProgressIndicator from "./components/progress_indicator";
import ProfileList from "./components/profile_list";
import CreateForm from "./components/new_profile_form";

const ProfilesQuery = gql`
  {
    profiles {
      name
      id
      description
      imageUrl
    }
  }
`;

const CreateProfileMutation = gql`
  mutation($name: String!, $description: String, $imageUrl: String) {
    createProfile(name: $name, description: $description, imageUrl: $imageUrl) {
      id
      name
      description
      imageUrl
    }
  }
`;

class App extends Component {
  createProfile = async profile => {
    console.log('profile', this.props.profile)
    await this.props.createProfile({
      variables: {
        name: profile.name,
        description: profile.description,
        imageUrl: profile.imageUrl
      },
      update: (store, { data: { createProfile } }) => {
        const data = store.readQuery({ query: ProfilesQuery });
        data.profiles.unshift(createProfile);
        store.writeQuery({ query: ProfilesQuery, data });
      }
    });
  };

  render() {
    const {
      data: { loading, profiles }
    } = this.props;

    if (loading) {
      return <ProgressIndicator />;
    }

    return (
      <div className="mh5 mv1">
        <CreateForm submit={this.createProfile} />
        <div className="w-100">
          <ProfileList profiles={profiles} />
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(ProfilesQuery),
  graphql(CreateProfileMutation, { name: "createProfile" }),
)(App);
