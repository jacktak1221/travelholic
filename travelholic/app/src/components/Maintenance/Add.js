import React from 'react';
import Modal from 'react-modal';
import axios from '../../axios/axios';
import {Link} from 'react-router-dom';

var querystring = require('querystring');

class Add extends React.Component {
    contact = {
        name: '',
        country: '',
        city: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            contact: this.contact,
            messageFromServer: '',
            modalIsOpen: false
        }
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.insertNewContact = this.insertNewContact.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({
            modalIsOpen: true
        });
    }

    closeModal() {
        this.setState({
            modalIsOpen: false,
            contact: this.contact,
            messageFromServer: ''
        });
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    handleSelectChange(e) {

    }

    onClick(e) {
        this.insertNewContact(this);
    }

    insertNewContact(e) {
        var contact = {
            name: e.state.name,
            country: e.state.country,
            city: e.state.city
        }
        axios.post('contact', contact).then(function (response) {
            e.setState({
                messageFromServer: response.data
            });
        });
    }

    handleTextChange(e) {
        const contact = {...this.state.contact};

        contact[e.target.name] = e.target.value;
        this.setState({
            contact: contact
        });

    }

    render() {
        if (this.state.messageFromServer == '') {
            return (
                <div>
                    <Button onClick={this.openModal}><span
                        className="glyphicon glyphicon-plus"></span></Button>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        contentLabel="Add contact"
                        className="Modal">
                        <Link
                            style={{textDecoration: 'none'}}>
                            <Button onClick={this.closeModal}><span
                                className="closebtn glyphicon glyphicon-remove"></span></Button>
                        </Link>
                        <br/>
                        <fieldset>
                            <label for="description">Description:</label>
                            <input type="text" id="description"
                                   name="description"
                                   value={this.state.description}
                                   onChange={this.handleTextChange}></input>
                            <label for="amount">Amount:</label>
                            <input type="number" id="amount" name="amount"
                                   value={this.state.amount}
                                   onChange={this.handleTextChange}></input>
                            <label for="month">Month:</label>
                        </fieldset>
                        <div className='button-center'>
                            <br/>
                            <Button onClick={this.onClick}>Add New contact</Button>
                        </div>
                    </Modal>
                </div>
            )
        } else {
            return (
                <div>
                    <Button onClick={this.openModal}><span
                        className="glyphicon glyphicon-plus"></span></Button>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        contentLabel="Add contact"
                        className="Modal">
                        <div className='button-center'>
                            <h3>{this.state.messageFromServer}</h3>
                            <Link
                                style={{textDecoration: 'none'}}>
                                <Button onClick={this.closeModal}>Close the
                                    Dialog</Button>
                            </Link>
                        </div>
                    </Modal>
                </div>
            )
        }
    }
}

export default Add;
