import React from "react";
import TextField from "@material-ui/core/TextField";

export default class CreateForm extends React.Component {
  state = {
    name: "",
    description: "",
    imageUrl: ""
  };

  editName = e => {
    const newName = e.target.value;
    this.setState({ name: newName });
  };

  editDescription = e => {
    const newDescription = e.target.value;
    this.setState({ description: newDescription });
  };

  editImageUrl = e => {
    const newImageUrl = e.target.value;
    this.setState({ imageUrl: newImageUrl });
  };

  handleSubmit = e => {
    this.props.submit(this.state);
    this.setState({ name: "", description: "", imageUrl: "" });
  };

  render() {
    const { name, description, imageUrl } = this.state;

    return (
      <div>
        <TextField
          onChange={this.editName}
          label="Name"
          margin="normal"
          value={name}
          fullWidth
        />
        <TextField
          onChange={this.editDescription}
          label="Description"
          margin="normal"
          value={description}
          fullWidth
        />
        <TextField
          onChange={this.editImageUrl}
          label="Image Url"
          margin="normal"
          value={imageUrl}
          fullWidth
        />
        <div
          onClick={this.handleSubmit}
          className="f6 ttu link dim br1 ba bw1 ph3 pv2 mb2 dib black"
        >
          submit
        </div>
      </div>
    );
  }
}
