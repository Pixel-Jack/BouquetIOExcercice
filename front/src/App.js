import React from 'react';
import createHistory from 'history/createBrowserHistory';
import { Route, Router, Switch } from 'react-router-dom';

import './App.css';
import TabsNavBarContainer from './tabs/TabsNavBarContainer';
import CountByMonthYearContainer from './tabs/countByMonthYear/CountByMonthYearContainer';
import NotFound from './components/NotFound';
import CountByPeriodContainer from './tabs/countByPeriod/CountByPeriodContainer';

const history = createHistory();

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <TabsNavBarContainer/>

          <Switch>
            <Route exact path="/byperiod" component={CountByPeriodContainer}/>
            <Route exact path="/" component={CountByMonthYearContainer}/>
            <Route path="*" component={NotFound}/>
          </Switch>
          <h4 className="hero author d-flex flex-row-reverse">By Clément Ponthieu</h4>
        </div>
      </Router>
    );
  }
}

export default App;