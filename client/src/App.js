import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo'

const ProfilesQuery = gql`
  {
  	profiles {
      name
      id
    }
  }
`;

class App extends Component {
  render() {
    const {data: {loading, profiles}} = this.props;
    console.log(this.props)
    if(loading) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <div>{profiles.map((profile, key)=> (
        <div key={profile.id}>{profile.name}</div>
      ))}</div>
    );
  }
}

export default graphql(ProfilesQuery)(App);
