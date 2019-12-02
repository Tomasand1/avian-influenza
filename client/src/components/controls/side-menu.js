/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Accordion, Card, Button } from "react-bootstrap";
import CheckBox from "./check-box";

export default class SideMenu extends Component {
  constructor() {
    super();

    this.state = {
      activeIndex: 0
    };
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  handleSubmit = entry => {
    this.props.submit(entry);
  };

  openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
  };

  closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  };

  toggle;

  render() {
    const { activeIndex } = this.state;
    return (
      <React.Fragment>
        <div id="mySidenav" className="sidenav">
          <a
            href="javascript:void(0)"
            className="closebtn"
            onClick={() => this.closeNav()}
          >
            &times;
          </a>
          <Accordion defaultActiveKey="0">
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  Select Bird Species
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <CheckBox submit={this.handleSubmit} />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
        <span className="open" onClick={() => this.openNav()}>
          &#9776;
        </span>
      </React.Fragment>
    );
  }
}
