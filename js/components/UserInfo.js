import React from "react";
import { connect } from "react-redux";
import { fetchUser } from "../redux/actions/userActions";
import { ProgressBar, Well } from "react-bootstrap";
import { UserDisplay } from "./UserDisplay";

class UserInfo extends React.Component {
  shouldCallApi = this.props.user.hasOwnProperty(this.props.name)
    ? false
    : true;
  componentDidUpdate() {
    if (this.props.open && this.shouldCallApi) {
      this.props.fetchUser(this.props.name.toLowerCase());
      this.shouldCallApi = false;
    }
  }

  render() {
    let { user, name } = this.props;
    return <UserDisplay {...user[name.toLowerCase()]} />;
  }
}

const mapStateToProps = state => {
  return { user: state.users };
};

export default connect(mapStateToProps, { fetchUser })(UserInfo);
