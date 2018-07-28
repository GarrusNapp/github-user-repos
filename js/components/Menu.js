import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import Form from "./Form";

export class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      key: 0,
      tabs: [],
      tabsDisabled: true
    };
  }

  getTabs = tabs => {
    console.log(typeof tabs, tabs);
    this.setState({
      tabs
    });
  };

  handleSelect = key => {
    this.setState({ key });
  };

  render() {
    let tabs = this.state.tabs.map((el, i) => {
      if (el.length > 0) {
        return (
          <Tab eventKey={i + 1} title={el} disabled={this.state.tabsDisabled}>
            {el}
          </Tab>
        );
      }
    });
    return (
      <Tabs
        activeKey={this.state.key}
        onSelect={this.handleSelect}
        id="controlled-tab-example"
      >
        <Tab eventKey={0} title="Form">
          <Form addTabs={this.getTabs} />
        </Tab>
        {tabs}
      </Tabs>
    );
  }
}
