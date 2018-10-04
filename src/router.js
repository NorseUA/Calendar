import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Year from './components/Year/Year'; // eslint-disable-line
import Month from './components/Month/Month'; // eslint-disable-line
import Day from './components/Day/Day'; // eslint-disable-line
import Event from './components/Events/Events'; // eslint-disable-line

const Router = () =>
  (<BrowserRouter>
    <Switch>
      <Route
        exact path="/:year"
        component={Year}
      />
      <Route
        exact path="/:year/:month"
        component={Month}
      />
      <Route
        exact path="/:year/:month/:day"
        component={Day}
      />
      <Route
        exact path="/:year/:month/:day/:event"
        render={(newDay, newMonth, newYear) => (
          <Event
            {...newDay}
            {...newMonth}
            {...newYear}
            pageName="add event"
            resetName="clear"
            submitName="save"
          />)}
      />
      <Route
        exact path="/:year/:month/:day/:event/:eventId"
        render={(newDay, newMonth, newYear, id) => (
          <Event
            {...newDay}
            {...newMonth}
            {...newYear}
            {...id}
            pageName="update event"
            resetName="cancel"
            submitName="update"
          />)}
      />
    </Switch></BrowserRouter>);

export default Router;
