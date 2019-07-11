import React from 'react';
import {Redirect} from "react-router-dom";
import axios from '../../axios/axios';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

class Delete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            modalIsOpen: false
        };
        this.onClick = this.onClick.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        this.setState({
            id: this.props.contact.id
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            id: nextProps.contact.id,
            month: nextProps.contact.month,
            year: nextProps.contact.year
        })
    }

    openModal() {
        this.setState({
            modalIsOpen: true
        });
    }

    closeModal() {
        this.setState({
            modalIsOpen: false
        });
    }

    onClick(e) {
        this.delete(this);
    }

    delete(e) {
        axios.delete('contact', {
            params: {id: e.state.id}
        })
            .then((response) => {
                this.closeModal();
                console.log(response);
                return (
                    <Redirect to="#/maintenance"/>
                );
            });
    }

    render() {
        return (
            <div>
                <Button color="danger" onClick={this.openDeleteModal}>Delete</Button>
                <Modal isOpen={this.state.deleteModalIsOpen} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Confirmation to delete</ModalHeader>
                    <ModalBody>
                        <p>Confirm to delete this entry?</p>
                        <p>Item ID: {item.id}</p>
                        <p>Item Name: {item.name}</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary"
                                onClick={() => this.removeData(item.id)}>Delete</Button>
                        <Button color="secondary" onClick={this.closeDeleteModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>

        );
    }
}

export default Delete;
