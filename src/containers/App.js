// Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Router from '../router';
// Styles
import * as styles from './App.scss';

export class App extends Component { //eslint-disable-line
  render() {
    const { year } = this.props;
    return (<div className={styles.app}>
      {location.pathname === '/' ?
        <Redirect to={`/${year}`} /> :
        <Router />}
    </div>
    );
  }
}

App.propTypes = {
  year: PropTypes.number
};

const mapStateToProps = state => ({ year: state.year.year });

export default connect(mapStateToProps)(App);
