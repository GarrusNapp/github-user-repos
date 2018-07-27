import React from "react";
import {
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Button
} from "react-bootstrap";

export class Form extends React.Component {
  state = { value: "" };

  getValidationState() {
    const { value } = this.state;
    if (value.length == 0) return null;
    let result;
    const usernameRegex = new RegExp("[^0-9A-Za-z-]|^-|-$|--");
    value.split(" ").forEach(el => {
      if (usernameRegex.test(el)) result = "error";
      else result = "success";
    });
    return result;
  }

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState()}
        >
          <ControlLabel>Provide usernames separated by space:</ControlLabel>
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="Enter text"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
          <HelpBlock>
            Username may only contain alphanumeric characters or single hyphens,
            and cannot begin or end with a hyphen{" "}
          </HelpBlock>
        </FormGroup>
        <Button type="submit">Submit</Button>
      </form>
    );
  }
}
