import React from "react";
import { connect } from "react-redux";
import { fetchUser } from "../redux/actions";
import { ProgressBar, Well } from "react-bootstrap";

const RepoDisplay = props => {
  return (
    <div className="repos">
      {props.repos ? (
        props.repos.map(el => (
          <div className="repo" key={el.id}>
            {el.error ? (
              <h4>{el.error}</h4>
            ) : (
              <React.Fragment>
                <h4>Name: {el.name} </h4>
                <p>Language: {el.language || "not provided"}</p>
                <p>Description: {el.description || "not provided"}</p>
                {el.fork ? <p className="text-warning">This repo is a fork.</p> : null}
                <a className="btn btn-primary" href={el.html_url}>See on github</a>
              </React.Fragment>
            )}
          </div>
        ))
      ) : (
        <ProgressBar active now={100} />
      )}
    </div>
  );
};

const UserDisplay = props => {
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
              <h2 className="text-primary">{props.login}</h2>
              <img src={props.avatar_url} />
              <h4>Name: {props.name || "not provided"}</h4>
              <h4>Location: {props.location || "not provided"}</h4>
              <h4>Bio: {props.bio || "not provided"}</h4>
              <RepoDisplay repos={props.repos} />
            </div>
          )}
        </React.Fragment>
      )}
    </Well>
  );
};

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
