import React from "react";
import TextField from "@material-ui/core/TextField";

export default class CreateForm extends React.Component {
  state = {
    name: ""
  };

  handleChange = e => {
    const newName = e.target.value;
    console.log(newName);
    this.setState({ name: newName });
  };

  handleSubmit = e => {
    if (e.key === "Enter") {
      this.props.submit(this.state.name);
      this.setState({ name: "" });
    }
  };

  render() {
    const { name } = this.state;

    return (
      <div>
        <TextField
          onChange={this.handleChange}
          onKeyDown={this.handleSubmit}
          label="Create New Profile"
          margin="normal"
          value={name}
          fullWidth
        />
      </div>
    );
  }
}
