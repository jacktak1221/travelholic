import React, {Component} from "react";
import axios from "../axios/axios"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
    Container, Col, Row,
    Button, Form, FormGroup, Label, Input,
    Card, CardImg, CardHeader, CardTitle, CardText, CardDeck, CardSubtitle, CardBody, Badge,
    DropdownToggle, DropdownMenu, DropdownItem,
    Nav, NavItem, NavLink,
    Table, TabContent, TabPane,
    UncontrolledTooltip, UncontrolledDropdown
} from "reactstrap";
import classnames from "classnames";


class Home extends Component {
    searchParam = {
        name: '',
        country: '',
        city: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: '',
            startDate: new Date(),
            endDate: new Date(),
            data: [],
            activeTab: '1',
            dropdownOpen: false,
            searchParam: this.searchParam

        };
        this.search = this.search.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.toggleTab = this.toggleTab.bind(this);
        this.reset = this.reset.bind(this);
    }

    componentDidMount() {
        this.search();
    }

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    onClick(e) {
        e.preventDefault();
        this.search(this);
    }

    reset(e) {
        e.preventDefault();
        this.setState({
            searchParam: this.searchParam
        })
    }

    search = () => {
        this.setState({loading: true});
        const searchQuery = this.state.searchParam.name;
        let endpoint = 'contact/findAll';

        if (searchQuery !== '') {
            endpoint = 'contact/name/' + searchQuery;
        }

        axios.get(endpoint)
            .then((response) => {
                this.setState({
                    data: response.data,
                    loading: false
                });
            })
            .catch(error => {
                this.setState({
                    // objects cannot be used as a react child
                    // -> <p>{error}</p> would throw otherwise
                    error: `${error}`,
                    loading: false
                });
            });
    }

    onChange = e => {
        const changedSearchParam = {...this.state.searchParam};

        changedSearchParam[e.target.name] = e.target.value;
        this.setState({
            searchParam: changedSearchParam
        });

    }

    handleStartDateChange(date) {
        this.setState({
            startDate: date
        });
    }

    handleEndDateChange(date) {
        this.setState({
            endDate: date
        });
    }

    renderResultInCard() {
        const {loading, error, data} = this.state;

        if (loading) {
            return <p>Loading ... please wait...</p>
        }

        if (error) {
            return (
                <p>
                    There was an error loading the repos.{" "}
                </p>
            );
        }

        return (
            <CardDeck>
                {
                    data.map((contact) => {
                        return (<Card key={contact.id}>
                            <CardImg top width="100%"
                                     src="https://www.pantone.com/images/products/COY-pantone-pms-limited-edition-color-of-the-year-2019-formula-guide-coated-uncoated-1.jpg"
                                     alt="Card image cap"/>
                            <CardBody>
                                <CardTitle>{contact.name}</CardTitle><Badge href="#" color="primary">Primary</Badge>
                                <CardSubtitle>{contact.city}</CardSubtitle>
                                <CardText>{contact.country}</CardText>
                                <Button>Book</Button>
                            </CardBody>
                        </Card>);
                    })
                }
            </CardDeck>
        );
    }

    renderQuickFind() {
        return (<Card>
            <CardBody>
                <Form>
                    <Row form>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="country">Country</Label>
                                <Input type="text" name="country" id="country" value={this.state.searchParam.country}
                                       onChange={this.onChange}/>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input type="text" name="name" id="name" value={this.state.searchParam.name}
                                       onChange={this.onChange}/>
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Label for="city">City</Label>
                                <Input type="text" name="city" id="city" value={this.state.searchParam.city}
                                       onChange={this.onChange}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <div className="col-md-3">
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleStartDateChange}

                            />
                        </div>
                        <div className="col-md-3">
                            <DatePicker
                                selected={this.state.endDate}
                                onChange={this.handleEndDateChange}

                            />
                        </div>
                    </Row>
                    <Row>
                        <Col md={1}>
                            <Button onClick={this.onClick}>Search</Button>
                        </Col>
                        <Col md={1}>
                            <Button onClick={this.reset}>Reset</Button>
                        </Col>
                    </Row>
                </Form>
            </CardBody>
        </Card>);
    }

    renderSearchBox() {
        return (
            <Row>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({active: this.state.activeTab === '1'})}
                            onClick={() => {
                                this.toggleTab('1');
                            }}
                        >
                            Quick Find
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({active: this.state.activeTab === '2'})}
                            onClick={() => {
                                this.toggleTab('2');
                            }}
                        >
                            Advanced Find
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                                <Container>
                                    {this.renderQuickFind()}
                                </Container>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="12">
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </Row>

        );
    }

    renderCardTest() {
        return (
            <Row>
                <Col lg="6" md="12">
                    <Card className="card-tasks">
                        <CardHeader>
                            <h6 className="title d-inline">Tasks(5)</h6>
                            <p className="card-category d-inline"> today</p>
                            <UncontrolledDropdown>
                                <DropdownToggle
                                    caret
                                    className="btn-icon"
                                    color="link"
                                    data-toggle="dropdown"
                                    type="button"
                                >
                                    <i className="tim-icons icon-settings-gear-63"/>
                                </DropdownToggle>
                                <DropdownMenu aria-labelledby="dropdownMenuLink" right>
                                    <DropdownItem
                                        href="#pablo"
                                        onClick={e => e.preventDefault()}
                                    >
                                        Action
                                    </DropdownItem>
                                    <DropdownItem
                                        href="#pablo"
                                        onClick={e => e.preventDefault()}
                                    >
                                        Another action
                                    </DropdownItem>
                                    <DropdownItem
                                        href="#pablo"
                                        onClick={e => e.preventDefault()}
                                    >
                                        Something else
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </CardHeader>
                        <CardBody>
                            <div className="table-full-width table-responsive">
                                <Table>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <FormGroup check>
                                                <Label check>
                                                    <Input defaultValue="" type="checkbox"/>
                                                    <span className="form-check-sign">
                                  <span className="check"/>
                                </span>
                                                </Label>
                                            </FormGroup>
                                        </td>
                                        <td>
                                            <p className="title">Update the Documentation</p>
                                            <p className="text-muted">
                                                Dwuamish Head, Seattle, WA 8:47 AM
                                            </p>
                                        </td>
                                        <td className="td-actions text-right">
                                            <Button
                                                color="link"
                                                id="tooltip636901683"
                                                title=""
                                                type="button"
                                            >
                                                <i className="tim-icons icon-pencil"/>
                                            </Button>
                                            <UncontrolledTooltip
                                                delay={0}
                                                target="tooltip636901683"
                                                placement="right"
                                            >
                                                Edit Task
                                            </UncontrolledTooltip>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <FormGroup check>
                                                <Label check>
                                                    <Input
                                                        defaultChecked
                                                        defaultValue=""
                                                        type="checkbox"
                                                    />
                                                    <span className="form-check-sign">
                                  <span className="check"/>
                                </span>
                                                </Label>
                                            </FormGroup>
                                        </td>
                                        <td>
                                            <p className="title">GDPR Compliance</p>
                                            <p className="text-muted">
                                                The GDPR is a regulation that requires businesses
                                                to protect the personal data and privacy of Europe
                                                citizens for transactions that occur within EU
                                                member states.
                                            </p>
                                        </td>
                                        <td className="td-actions text-right">
                                            <Button
                                                color="link"
                                                id="tooltip457194718"
                                                title=""
                                                type="button"
                                            >
                                                <i className="tim-icons icon-pencil"/>
                                            </Button>
                                            <UncontrolledTooltip
                                                delay={0}
                                                target="tooltip457194718"
                                                placement="right"
                                            >
                                                Edit Task
                                            </UncontrolledTooltip>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <FormGroup check>
                                                <Label check>
                                                    <Input defaultValue="" type="checkbox"/>
                                                    <span className="form-check-sign">
                                  <span className="check"/>
                                </span>
                                                </Label>
                                            </FormGroup>
                                        </td>
                                        <td>
                                            <p className="title">Solve the issues</p>
                                            <p className="text-muted">
                                                Fifty percent of all respondents said they would
                                                be more likely to shop at a company
                                            </p>
                                        </td>
                                        <td className="td-actions text-right">
                                            <Button
                                                color="link"
                                                id="tooltip362404923"
                                                title=""
                                                type="button"
                                            >
                                                <i className="tim-icons icon-pencil"/>
                                            </Button>
                                            <UncontrolledTooltip
                                                delay={0}
                                                target="tooltip362404923"
                                                placement="right"
                                            >
                                                Edit Task
                                            </UncontrolledTooltip>
                                        </td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg="6" md="12">
                    <Card>
                        <CardHeader>
                            <CardTitle tag="h4">Simple Table</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Table className="tablesorter" responsive>
                                <thead className="text-primary">
                                <tr>
                                    <th>Name</th>
                                    <th>Country</th>
                                    <th>City</th>
                                    <th className="text-center">Salary</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Dakota Rice</td>
                                    <td>Niger</td>
                                    <td>Oud-Turnhout</td>
                                    <td className="text-center">$36,738</td>
                                </tr>
                                <tr>
                                    <td>Minerva Hooper</td>
                                    <td>Curaçao</td>
                                    <td>Sinaai-Waas</td>
                                    <td className="text-center">$23,789</td>
                                </tr>
                                <tr>
                                    <td>Sage Rodriguez</td>
                                    <td>Netherlands</td>
                                    <td>Baileux</td>
                                    <td className="text-center">$56,142</td>
                                </tr>
                                <tr>
                                    <td>Philip Chaney</td>
                                    <td>Korea, South</td>
                                    <td>Overland Park</td>
                                    <td className="text-center">$38,735</td>
                                </tr>
                                <tr>
                                    <td>Doris Greene</td>
                                    <td>Malawi</td>
                                    <td>Feldkirchen in Kärnten</td>
                                    <td className="text-center">$63,542</td>
                                </tr>
                                <tr>
                                    <td>Mason Porter</td>
                                    <td>Chile</td>
                                    <td>Gloucester</td>
                                    <td className="text-center">$78,615</td>
                                </tr>
                                <tr>
                                    <td>Jon Porter</td>
                                    <td>Portugal</td>
                                    <td>Gloucester</td>
                                    <td className="text-center">$98,615</td>
                                </tr>
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        )
    }

    render() {
        return <div>
            {this.renderSearchBox()}
            {this.renderResultInCard()}

        </div>;
    }
}

export default Home;