import React from 'react';
import {Button, Col, ControlLabel, Form, FormControl, FormGroup} from 'react-bootstrap';
import axios from 'axios';

var querystring = require('querystring');

class Add extends React.Component {
    constructor() {
        super();
        this.state = {
            item: {}
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    handleChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});

        console.log(this.state);
    }


    handleSubmit(e) {
        e.preventDefault();

        const {item} = this.state;

        console.log(this.state);

        axios.post('http://localhost:8080/api/group/add', item).then(function (response) {
            // e.setState({
            //     messageFromServer: response.data
            // });
        });
    }


    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit} horizontal>
                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={2}>
                            Name
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text" name="name" placeholder="Enter Name" onChange={this.handleChange}/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={2}>
                            City
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text" name="city" placeholder="Enter City" onChange={this.handleChange}/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={2}>
                            Country
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text" name="country" placeholder="Country" onChange={this.handleChange}/>
                        </Col>
                    </FormGroup>

                    <Button type="submit">Submit</Button>
                </Form>
            </div>
        )
    }
}

export default Add;