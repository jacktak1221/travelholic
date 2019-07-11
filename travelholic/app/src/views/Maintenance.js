import React, {Component} from "react";
import axios from '../axios/axios';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import Update from '../components/Maintenance/Update';

class Maintenance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: true,
            isError: false,
            deleteModalIsOpen: false,
            target: {
                id: '',
                name: '',
                country: '',
                city: ''
            }
        }

        this.getData = this.getData.bind(this);
        this.removeData = this.removeData.bind(this);
        this.openDeleteModal = this.openDeleteModal.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {
        console.log('calling getData()');
        await axios.get('contact/findAll')
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    this.setState({
                        data: response.data,
                        isLoading: false
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    data: [],
                    isLoading: false,
                    isError: true
                })
            })
    }


    removeData() {

        console.log('calling removeData: ' + `${this.state.target.id}`);
        axios.delete(`contact/delete/${this.state.target.id}`)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            }).finally(() => {
            this.getData();
            //let updatedData = [...this.state.data].filter(i => i.id !== id);
            // console.log('updated data');
            // console.log(updatedData);
            // this.setState({data: updatedData});
            this.closeDeleteModal();
        })
        ;
    }

    openDeleteModal(item) {
        console.log('calling openDeleteModal');
        console.log(item);

        this.setState({
            deleteModalIsOpen: true,
            target: item
        });

    }

    closeDeleteModal() {
        this.setState({
            deleteModalIsOpen: false
        });
    }

    render() {
        const {data, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading ... </p>;
        }

        return (
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <th></th>
                        <th className='button-col'>Name</th>
                        <th className='button-col'>Country</th>
                        <th className='button-col'>City</th>
                        <th className='button-col'>ID</th>
                        <th className='button-col'>Update</th>
                        <th className='button-col'>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        data.map((item, key) => {
                            return <tr key={key}>
                                <td className='counterCell'></td>
                                <td className='desc-col'>{item.name}</td>
                                <td className='button-col'>{item.country}</td>
                                <td className='button-col'>{item.city}</td>
                                <td className='button-col'>{item.id}</td>
                                <td className='button-col'>
                                    <Update contact={item}>Update</Update></td>
                                <td className='button-col'>
                                    <Button color="danger" onClick={() => this.openDeleteModal(item)}>Delete</Button>
                                </td>
                            </tr>
                        })
                    }
                    </tbody>
                </table>
                <Modal isOpen={this.state.deleteModalIsOpen} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Confirmation to delete</ModalHeader>
                    <ModalBody>
                        <p>Confirm to delete this entry?</p>
                        <p>Item ID: {this.state.target.id}</p>
                        <p>Item Name: {this.state.target.name}</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary"
                                onClick={() => this.removeData()}>Delete</Button>
                        <Button color="secondary" onClick={this.closeDeleteModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }


}

export default Maintenance;