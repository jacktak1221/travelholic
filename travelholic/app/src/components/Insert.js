import React from 'react';
import {
    Alert,
    Button,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row
} from 'reactstrap';
import axios from '../axios/axios';
import NotificationAlert from "react-notification-alert";

class Insert extends React.Component {
    contact = {
        name: '',
        country: '',
        city: ''
    };

    options = {
        place: "tr",
        message: '',
        type: "success",
        icon: "tim-icons icon-bell-55",
        autoDismiss: 7
    };

    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            messageFromServer: '',
            contact: this.contact,
            visible: false
        };

        //this.onClick = this.onClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onDimiss = this.onDimiss.bind(this);
        this.batchAdd = this.batchAdd.bind(this);
        this.batchDelete = this.batchDelete.bind(this);
    }

    handleChange(e) {
        const contact = {...this.state.contact};

        contact[e.target.name] = e.target.value;
        this.setState({
            contact: contact
        });
    }

    // onClick(e) {
    //     this.handleSubmit(this);
    // }

    onDimiss() {
        this.setState({
            visible: false
        })
    }

    batchAdd() {
        axios.post('contact/batchAdd')
            .then((response) => {
                console.log(response);

                this.options.message = (
                    <div>
                        <div>
                            {response.data}
                        </div>
                    </div>
                );
            });

    }

    batchDelete() {
        axios.delete('contact/deleteAll')
            .then((response) => {
                console.log(response);

                this.options.message = (
                    <div>
                        <div>>
                            {response.data}
                        </div>
                    </div>
                );
            });
    }

    handleSubmit = () => {
        axios.post('contact/add', this.state.contact)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    messageFromServer: response.data,
                    modalIsOpen: false,
                    contact: this.contact,
                    visible: true
                })

                console.log(this.state);
                this.options.message = (
                    <div>
                        <div>
                            {response.data}
                        </div>
                    </div>
                );

                this.refs.notificationAlert.notificationAlert(this.options);
            });
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


    render() {
        if (this.state.messageFromServer !== '') {
            this.setState({
                messageFromServer: ''
            })

        } else {
            return (
                <div>
                    <div className="react-notification-alert-container">
                        <NotificationAlert ref="notificationAlert"/>
                    </div>
                    <Form>
                        <FormGroup>
                            <Row form>
                                <Col md={4}>
                                    <Label for="name">Name</Label>
                                    <Input type="text" name="name" id="name" onChange={this.handleChange}
                                           value={this.state.contact.name}/>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={4}>
                                    <Label for="country">Country</Label>
                                    <Input type="text" name="country" id="country" onChange={this.handleChange}
                                           value={this.state.contact.country}/>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={4}>
                                    <Label for="city">City</Label>
                                    <Input type="text" name="city" id="city" onChange={this.handleChange}
                                           value={this.state.contact.city}/>
                                </Col>
                            </Row>
                        </FormGroup>
                        <Button onClick={this.openModal}>Add</Button>
                        <Button onClick={this.batchAdd}>Batch Add</Button>
                        <Button onClick={this.batchDelete}>Batch Delete</Button>
                        <Modal isOpen={this.state.modalIsOpen} toggle={this.toggle}>
                            <ModalHeader toggle={this.toggle}>Confirm to Add</ModalHeader>
                            <ModalBody>
                                Confirm to add the new country?
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={() => this.handleSubmit()}>Add</Button>{' '}
                                <Button color="secondary" onClick={this.closeModal}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                    </Form>
                </div>
            );
        }
    }
}

export default Insert;


/*
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
 */