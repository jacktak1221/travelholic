import React from 'react';
import {Button, Form, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import {Link} from 'react-router-dom';

var querystring = require('querystring');

class Add2 extends React.Component {
    constructor() {
        super();
        this.state = {
            id: '',
            name: '',
            city: '',
            country: '',
            modalIsOpen: false
        }
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.insertNewGroup = this.insertNewGroup.bind(this);
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
            // description: '',
            // amount: '',
            // month: 'Jan',
            // year: 2016,
            messageFromServer: ''
        });
    }

    componentDidMount() {
        // if(this.props.selectedMonth == 'All'){
        //     this.setState({
        //         month: 'Jan'
        //     });
        // }else{
        //     this.setState({
        //         month: this.props.selectedMonth
        //     });
        // }
        // this.setState({
        //     year: this.props.selectedYear
        // });
    }

    componentWillReceiveProps(nextProps) {
        // if(this.props.selectedMonth == 'All'){
        //     this.setState({
        //         month: 'Jan'
        //     });
        // }else{
        //     this.setState({
        //         month: this.props.selectedMonth
        //     });
        // }
        // this.setState({
        //     year:nextProps.selectedYear
        // })
    }

    handleSelectChange(e) {
        // if (e.target.name == 'month') {
        //     this.setState({
        //         month: e.target.value
        //     });
        // }
        // if (e.target.name == 'year') {
        //     this.setState({
        //         year: e.target.value
        //     });
        // }
    }

    onClick(e) {
        this.insertNewGroup(this);
    }

    insertNewGroup(e) {
        var group = {
            id: e.state.id,
            name: e.state.name,
            city: e.state.city,
            country: e.state.country
        }
        axios.post('http://localhost:8080/api/groups', group).then(function (response) {
            e.setState({
                messageFromServer: response.data
            });
        });
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

    getValidationState() {

    }

    render() {
        if (this.state.messageFromServer == '') {
            return (
                <div>

                    <Form>
                        <FormGroup
                            controlId="formBasicText"
                            validationState={this.getValidationState()}
                        />
                        <ControlLabel>Working example with validation</ControlLabel>

                        <FormControl
                            type="text"
                            value=""
                            placeholder="Enter Text"
                        />
                    </Form>

                    <Button bsStyle="success" bsSize="small" onClick={this.openModal}>
                        <span className="glyphicon glyphicon-plus"></span>
                    </Button>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        contentLabel="Add Group"
                        className="Modal">
                        <Link to={{pathname: '/api/groups', search: ''}}
                              style={{textDecoration: 'none'}}>
                            <Button bsStyle="danger" bsSize="xsmall" onClick={this.closeModal}>
                                <span className="closebtn glyphicon glyphicon-remove"></span>
                            </Button>
                        </Link>
                        <br/>
                        <fieldset>
                            <label for="country">Month:</label>
                            <select id="country" name="country" value={this.state.country}
                                    onChange={this.handleSelectChange}>
                                <option value="Ireland" id="Ireland">Ireland</option>
                                <option value="Finland" id="Finland">Finland</option>
                                <option value="China" id="China">China</option>
                            </select>
                            <label for="city">City:</label>
                            <select id="city" name="city" value={this.state.city}
                                    onChange={this.handleSelectChange}>
                                <option value="Hong Kong" id="HongKong">Hong Kong</option>
                                <option value="Shanghai" id="Shanghai">Shanghai</option>
                            </select>
                        </fieldset>
                        <div className='button-center'>
                            <br/>
                            <Button bsStyle="success" bsSize="small" onClick={this.onClick}>Add New Group</Button>
                        </div>
                    </Modal>
                </div>
            )
        }
        else {
            return (
                <div>
                    <form>
                    </form>

                    <Button bsStyle="success" bsSize="small" onClick={this.openModal}>
                        <span className="glyphicon glyphicon-plus"></span>
                    </Button>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        contentLabel="Add Group"
                        className="Modal">
                        <div className='button-center'>
                            <h3>{this.state.messageFromServer}</h3>
                            <Link
                                to={{pathname: '/api/groups', search: ''}}
                                style={{textDecoration: 'none'}}>
                                <Button bsStyle="success" bsSize="xsmall" onClick={this.closeModal}>Close the
                                    Dialog</Button>
                            </Link>
                        </div>
                    </Modal>
                </div>
            )
        }
    }
}

export default Add2;