import React from "react";
import ReactDOM from "react-dom";
import { Menu } from "./Menu";
import { Provider } from "react-redux";
import store from "../redux/store"



class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className="container">
          <main>
            <Menu />
          </main>
        </div>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
