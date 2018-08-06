import React from "react";
import { ProgressBar } from "react-bootstrap";

export const RepoDisplay = props => {
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
                {el.fork ? (
                  <p className="text-warning">This repo is a fork.</p>
                ) : null}
                <a className="btn btn-primary" href={el.html_url}>
                  See on github
                </a>
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
