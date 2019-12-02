import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Main from "./components/main/main";
import TimeSlider from "./components/controls/time-slider";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Switch>
                    <Route exact path="/" component={Main} />
                    <Route exact path="/slider" component={TimeSlider} />
                </Switch>
            </div>
        );
    }
}

export default App;
