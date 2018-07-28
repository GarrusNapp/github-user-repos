import React from "react";
import {
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Button
} from "react-bootstrap";
import { connect } from "react-redux";
import { fetchUser } from "../redux/actions";

class Form extends React.Component {
  state = { value: "", valid: null };

  getValidationState(str, callback) {
    let result;
    const usernameRegex = new RegExp("[^0-9A-Za-z-\\s]|^-|-$|--");
    if (usernameRegex.test(str)) result = "error";
    else if (str.length == 0) result = null;
    else result = "success";
    this.setState(
      {
        valid: result
      },
      callback(result)
    );
  }

  handleChange = e => {
    console.log(e.target.value);
    let { value } = e.target;
    this.setState(
      { value },
      this.getValidationState(value, result => {
        if (result != "error") this.props.addTabs(value.split(" "));
      })
    );
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="formBasicText" validationState={this.state.valid}>
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

export default connect(null, { fetchUser })(Form);
