import React from 'react';
import axios from '../../axios/axios';
import {Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import {
    Modal, ModalHeader, ModalBody, ModalFooter,
    Row, Col, Label, Input, FormGroup
} from 'reactstrap';


//var querystring = require('querystring');

class Update extends React.Component {
    constructor() {
        super();
        this.state = {
            contact: {
                id: '',
                country: '',
                city: '',
                name: ''
            },
            messageFromServer: '',
            modalIsOpen: false
        }
        this.update = this.update.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        this.setState({
            contact: this.props.contact
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            contact: nextProps.contact
        })
    }

    openModal() {
        this.setState({
            modalIsOpen: true
        });
    }

    closeModal() {
        this.setState({
            modalIsOpen: false,
            messageFromServer: ''
        });
    }

    handleSelectChange(e) {
        const contact = {...this.state.contact};

        contact[e.target.name] = e.target.value;
        this.setState({
            contact: contact
        });
        // if (e.target.name == "month") {
        //     this.setState({
        //         month: e.target.value
        //     });
        // }
        // if (e.target.name == "year") {
        //     this.setState({
        //         year: e.target.value
        //     });
        // }
    }

    handleTextChange(e) {
        // if (e.target.name == "description") {
        //     this.setState({
        //         description: e.target.value
        //     });
        // }
        // if (e.target.name == "amount") {
        //     this.setState({
        //         amount: e.target.value
        //     });
        // }
    }

    onClick(e) {
        this.update(this);
    }

    update(e) {
        var contact = {
            contact: e.state.contact
        }

        axios.post('contact/update', contact).then(function (response) {
            e.setState({
                messageFromServer: response.data
            });
        });
    }

    render() {
        if (this.state.messageFromServer === '') {
            return (
                <Row>
                    <Button onClick={this.openModal}></Button>
                    <Modal isOpen={this.state.modalIsOpen} toggle={this.toggle}>
                        <Link to={{pathname: '/Maintenance', search: '?month=' + this.state.month + '&year=' + this.state.year}}>
                        </Link><br/>
                        <FormGroup>
                            <Row form>
                                <Col md="4">
                                    <Label for="name">Name</Label>
                                    <Input type="text" name="name" id="name" onChange={this.handleTextChange()}
                                           value={this.state.contact.name}/>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={4}>
                                    <Label for="country">Country</Label>
                                    <Input type="text" name="country" id="country" onChange={this.handleTextChange}
                                           value={this.state.contact.country}/>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={4}>
                                    <Label for="city">City</Label>
                                    <Input type="text" name="city" id="city" onChange={this.handleTextChange}
                                           value={this.state.contact.city}/>
                                </Col>
                            </Row>
                        </FormGroup>
                        <div className='button-center'>
                            <br/>
                            <Button onClick={this.onClick}>Update</Button>
                            <Button onClick={this.closeModal}>Cancel</Button>
                        </div>
                    </Modal>
                </Row>
            )
        } else {
            return (
                <div>
                    <Button onClick={this.openModal}>{this.props.buttonLabel}</Button>
                    <Modal
                        isOpen={this.state.modalIsOpen}>
                        <ModalHeader toggle={this.toggle}>Confirm to Add</ModalHeader>
                        <ModalBody>
                            {this.state.messageFromServer}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.onClick}>Add</Button>{' '}
                            <Button color="secondary" onClick={this.closeModal}>Cancel</Button>
                        </ModalFooter>
                    </Modal>


                </div>
            )
        }
    }
}

export default Update;
