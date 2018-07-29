import React from "react";
import { connect } from "react-redux";
import { fetchUser } from "../redux/actions";
import { ProgressBar, Well } from "react-bootstrap";

const UserDisplay = props => {
  // <ProgressBar active now={100} />
  //{"login":"Qwertyu","avatar_url":"https://avatars0.githubusercontent.com/u/462912?v=4","name":null,"location":null,"bio":null,"fetching":false}
  return (
    <Well>
      {props.fetching ? (
        <ProgressBar active now={100} />
      ) : (
        <React.Fragment>
          {props.error ? (
            <h2>{props.error}</h2>
          ) : (
            <div className="user-display">
              <h2>User: {props.login}</h2>
              <img src={props.avatar_url} />
              <h4>Name: {props.name || "not provided"}</h4>
              <h4>Location: {props.location || "not provided"}</h4>
              <h4>Bio: {props.bio || "not provided"}</h4>
            </div>
          )}
        </React.Fragment>
      )}
    </Well>
  );
};

class UserInfo extends React.Component {
  shouldCallApi = this.props.user.hasOwnProperty(this.props.name) ? false : true
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
