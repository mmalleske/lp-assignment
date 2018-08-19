import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import ProgressIndicator from "./components/progress_indicator";
import ProfileList from "./components/profile_list";

const ProfilesQuery = gql`
  {
    profiles {
      name
      id
    }
  }
`;

const updateProfileMutation = gql`
  mutation($id: ID!, $name: String!) {
    updateProfile(id: $id, name: $name)
  }
`;

class App extends Component {
  updateProfile = async profile => {
    await this.props.updateProfile({
      variables: {
        id: profile.id,
        name: "KANPAI!!"
      }
    });
  };

  render() {
    const {
      data: { loading, profiles }
    } = this.props;
    console.log(this.props);
    if (loading) {
      return <ProgressIndicator />;
    }

    return (
      <div className="flex blue">
        <div className="w-100">
          <ProfileList profiles={profiles} />
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(ProfilesQuery),
  graphql(updateProfileMutation, { name: "updateProfile" })
)(App);
