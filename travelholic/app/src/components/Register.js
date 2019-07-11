import React, {Component} from "react";
import {
    Row, Col, Button,
    Container, Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from "reactstrap";

class Register extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.select = this.select.bind(this);

        this.state = {
            dropdownValue: 'Hello',
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    select(e) {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
            dropdownValue: e.target.innerText
        });
    }

    render() {
        return (
            <Container>
                <Button color="primary">primary</Button>

                <Row>
                    <Col>.col</Col>
                </Row>
                <Row>
                    <Col>.col</Col>
                    <Col>.col</Col>
                    <Col>.col</Col>
                    <Col>.col</Col>
                </Row>
                <Row>
                    <Col xs="3">.col-3</Col>
                    <Col xs="auto">.col-auto - variable width content</Col>
                    <Col xs="3">.col-3</Col>
                </Row>
                <Row>
                    <Col xs="6">.col-6</Col>
                    <Col xs="6">.col-6</Col>
                </Row>
                <Row>
                    <Col xs="6" sm="4">.col-6 .col-sm-4</Col>
                    <Col xs="6" sm="4">.col-6 .col-sm-4</Col>
                    <Col sm="4">.col-sm-4</Col>
                </Row>
                <Row>
                    <Col sm={{size: 6, order: 2, offset: 1}}>.col-sm-6 .order-sm-2 .offset-sm-1</Col>
                </Row>
                <Row>
                    <Col sm="12" md={{size: 6, offset: 3}}>.col-sm-12 .col-md-6 .offset-md-3</Col>
                </Row>
                <Row>
                    <Col sm={{size: 'auto', offset: 1}}>.col-sm-auto .offset-sm-1</Col>
                    <Col sm={{size: 'auto', offset: 1}}>.col-sm-auto .offset-sm-1</Col>
                </Row>

                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret>
                        {this.state.dropdownValue}
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={this.select}>Header</DropdownItem>
                        <DropdownItem onClick={this.select}>Action</DropdownItem>
                        <DropdownItem onClick={this.select}>Another Action</DropdownItem>
                    </DropdownMenu>
                </Dropdown>

                <div className="alert alert-primary" role="alert">
                    A simple primary alert—check it out!
                </div>
                <div className="alert alert-secondary" role="alert">
                    A simple secondary alert—check it out!
                </div>
                <div className="alert alert-success" role="alert">
                    A simple success alert—check it out!
                </div>
                <div className="alert alert-danger" role="alert">
                    A simple danger alert—check it out!
                </div>
                <div className="alert alert-warning" role="alert">
                    A simple warning alert—check it out!
                </div>
                <div className="alert alert-info" role="alert">
                    A simple info alert—check it out!
                </div>
                <div className="alert alert-light" role="alert">
                    A simple light alert—check it out!
                </div>
                <div className="alert alert-dark" role="alert">
                    A simple dark alert—check it out!
                </div>

                <button type="button" className="btn btn-primary">Primary</button>
                <button type="button" className="btn btn-secondary">Secondary</button>
                <button type="button" className="btn btn-success">Success</button>
                <button type="button" className="btn btn-danger">Danger</button>
                <button type="button" className="btn btn-warning">Warning</button>
                <button type="button" className="btn btn-info">Info</button>
                <button type="button" className="btn btn-light">Light</button>
                <button type="button" className="btn btn-dark">Dark</button>
                <button type="button" className="btn btn-link">Link</button>

            </Container>
        );
    }
}

export default Register;