import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import ProgressIndicator from './components/progress_indicator';
import ProfileList from './components/profile_list';

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
        <ProgressIndicator />
      );
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

export default graphql(ProfilesQuery)(App);
