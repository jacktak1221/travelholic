import React, {Component} from "react";
import Header from "../components/Header/Header";
import {HashRouter, Route} from "react-router-dom";
import appRoutes from "../routes/appRoutes";
import Switch from "@material-ui/core/es/Switch/Switch";
import Insert from "../components/Insert";
import Register from "../components/Register";
import Maintenance from "../views/Maintenance";
import Home from "../views/Home";
import LoginPage from "../views/LoginPage";


class TravelholicApp extends Component {

    routing() {
        return (
            <HashRouter>
                <div>
                    <div className="content">
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/add" component={Insert}/>
                        <Route exact path="/maintenance" component={Maintenance}/>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/login" component={LoginPage} />
                    </div>
                </div>
            </HashRouter>
        );
    }
    routing2() {
        return (
            <HashRouter>
                <div>
                    <div className="content">
                        {appRoutes.map((prop, key) => {
                            console.log(prop);
                            return (
                                <Route exact path={prop.path} component={prop.component} key={key}/>
                            );
                        })}
                    </div>
                </div>
            </HashRouter>
        );
    }

    render() {
        return (
            <div className="wrapper">
                <div id="main-panel" className="main-panel" ref="mainPanel">
                    <Header {...this.props} />
                    {this.routing()}

                </div>
            </div>
        )
    }
}

export default TravelholicApp;