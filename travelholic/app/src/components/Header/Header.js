import React, {Component} from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink} from 'reactstrap';
import appRoutes from "../../routes/appRoutes";

// https://www.elledecor.com/design-decorate/color/a25403239/pantone-color-of-the-year-2019/
class Header extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render2() {
        return (
            <Nav>
                <NavItem>
                    <NavLink href="#/">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#/Add">Add</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#/Maintenance">Maintenance</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#/Register">Register</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink disabled href="#/LoginPage">Login Page</NavLink>
                </NavItem>
            </Nav>
        );
    }

    render() {
        return (
            <div>
                <Navbar expand="md">
                    <NavbarBrand href="/">Travelholic</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {appRoutes.map((prop) => {
                                if (!prop.redirect)
                                    return (
                                        <NavItem key={prop.name}>
                                            <NavLink href={prop.path}>
                                                {prop.name}
                                            </NavLink>
                                        </NavItem>
                                    );
                                return null;
                            })}
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}


export default Header;