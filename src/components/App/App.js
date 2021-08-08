import React from 'react';

import { BrowserRouter, Switch, Route } from "react-router-dom";
import StepPage from '../../views/StepPage';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={StepPage} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
