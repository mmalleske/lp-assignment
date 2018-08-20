import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ProfileCard from "./profile_card";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeleteIcon from "@material-ui/icons/Delete";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

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

const deleteProfileMutation = gql`
  mutation($id: ID!) {
    deleteProfile(id: $id)
  }
`;

class CheckboxListSecondary extends React.Component {
  updateProfile = async profile => {
    await this.props.updateProfile({
      variables: {
        id: profile.id,
        name: "foo"
      },
      update: store => {
        const data = store.readQuery({ query: ProfilesQuery });
        data.profiles = data.profiles.map(
          x =>
            x.id === profile.id
              ? {
                  ...profile,
                  name: "foo"
                }
              : x
        );
        store.writeQuery({ query: ProfilesQuery, data });
      }
    });
  };

  deleteProfile = async profile => {
    await this.props.deleteProfile({
      variables: {
        id: profile.id
      },
      update: store => {
        const data = store.readQuery({ query: ProfilesQuery });
        data.profiles = data.profiles.filter(x => x.id !== profile.id);
        store.writeQuery({ query: ProfilesQuery, data });
      }
    });
  };

  state = {
    checked: [1]
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };

  render() {
    const { classes, profiles } = this.props;

    return (
      <div className="flex">
        {profiles &&
          profiles.map(profile => (
            <ProfileCard
              name={profile.name}
              key={`key-${profile.id}`}
              imageUrl={profile.imageUrl}
              description={profile.description}
            />
          ))}
      </div>
    );
  }
}

CheckboxListSecondary.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles),
  graphql(updateProfileMutation, { name: "updateProfile" }),
  graphql(deleteProfileMutation, { name: "deleteProfile" })
)(CheckboxListSecondary);
