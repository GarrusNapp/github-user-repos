import React from "react";
import { Well, ProgressBar } from "react-bootstrap";
import { RepoDisplay } from "./RepoDisplay";

export const UserDisplay = props => {
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
