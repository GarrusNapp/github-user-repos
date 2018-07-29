import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import Form from "./Form";
import UserInfo from "./UserInfo";

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
    this.setState({
      tabs
    });
  };

  handleSelect = key => {
    this.setState({ key });
  };

  enableTabs = () => {
    this.setState({ tabsDisabled: false });
  };

  render() {
    let tabs = this.state.tabs.map((el, i) => {
      if (el.length > 0) {
        return (
          <Tab
            eventKey={i + 1}
            title={el}
            disabled={this.state.tabsDisabled}
            key={el + i}
          >
            <UserInfo name={el} open={this.state.key == i + 1} />
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
        <Tab eventKey={0} title="Form" key={"Form0"}>
          <Form
            addTabs={this.getTabs}
            handleSelect={this.handleSelect}
            enableTabs={this.enableTabs}
          />
        </Tab>
        {tabs}
      </Tabs>
    );
  }
}
