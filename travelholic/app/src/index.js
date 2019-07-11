import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/App.css";
import TravelholicApp from "./layouts/TravelholicApp";


ReactDOM.render(<TravelholicApp/>, document.getElementById('root'));
// ReactDOM.render(
//     <HashRouter>
//         <Switch>
//             {indexRoutes.map((prop, key) => {
//                 if (prop.name === 'Home') {
//                     return <Route exact path={prop.path} component={prop.component} key={key}/>;
//                 } else {
//                     return <Route path={prop.path} component={prop.component} key={key}/>;
//                 }
//             })}
//         </Switch>
//     </HashRouter>,
//     document.getElementById('root')
// );
