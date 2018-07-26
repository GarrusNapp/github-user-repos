import React from "react";
import ReactDOM from "react-dom";
import { Form } from "./Form";
import { Menu } from "./Menu";

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <main>
          <Menu />
          <Form />
        </main>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
