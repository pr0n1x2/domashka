import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './styles.modules.scss';
import {changeField} from "actions";

class MainPage extends Component {

  handlerChange = (ev) => {
    const { value } = ev.target;
    this.props.changeField(value);
  };

  render() {
    const { appName } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
          >
            Learn React
          </a>
          <div>!!{appName}!!</div>
          <input
              type="text"
              value={appName}
              onChange={this.handlerChange}
          />
        </header>
      </div>
    );
  }
}

MainPage.propTypes = {
  appName: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  appName: state.app.name,
});

const mapDispatchToProps = dispatch => ({
  changeField: value => dispatch(changeField(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
