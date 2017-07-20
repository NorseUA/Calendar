// Modules
import React, { Component } from 'react';
// import { connect } from 'react-redux';

// Styles
import * as styles from './App.scss';

export default class App extends Component {
  componentDidMount() {
    console.log('Welcome');
  }

  render() {
    return (
      <div className={styles.app}>
        Hola!!! Congratulations!!!
      </div>
    );
  }
}

// App.propTypes = {
//
// };
//
// const mapStateToProps = state => ({
//
// });
//
// export default connect(mapStateToProps, {
//
// })(App);
