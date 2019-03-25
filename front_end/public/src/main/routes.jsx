import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter , Route,Redirect, Switch } from 'react-router-dom'

import Todo from '../todo/todo'
import About from '../about/about'

export default props => (
    <HashRouter>
        <Switch>
            <Route path="/" exact component={Todo} />
            <Route path="/todos" component={Todo}/>
            <Route path="/about" component={About}/>
            <Route path="*" component={Todo}/>
        </Switch>
     </HashRouter>
)