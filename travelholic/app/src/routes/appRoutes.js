import Home from "../views/Home";
import Maintenance from "../views/Maintenance";
import LoginPage from "../views/LoginPage";
import {Route} from "react-router-dom";
import Insert from "../components/Insert";
import Register from "../components/Register";
import React from "react";

const appRoutes = [
    {
        path: '#/',
        name: 'Home',
        component: Home
    },
    {
        path: '#/add',
        name: 'add',
        component: Insert
    },
    {
        path: '#/maintenance',
        name: 'Maintenance',
        component: Maintenance
    },
    {
        path: '#/register',
        name: 'register',
        component: Register
    },
    {
        path: '#/loginPage',
        name: 'LoginPage',
        component: LoginPage
    },
    { redirect: true, path: "#/", to: "/home", name: "Home" }
]

export default appRoutes;