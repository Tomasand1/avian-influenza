import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Main from "./components/main/main";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Switch>
                    <Route exact path="/" component={Main} />
                </Switch>
            </div>
        );
    }
}

export default App;
