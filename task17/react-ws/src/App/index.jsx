import React, {Component} from 'react';
import Header from '../Header';
import socketIOClient from 'socket.io-client'
import styles from './styles.module.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "localhost:8000",
      films: [],
    };
  }

  componentDidMount() {
    const socket = socketIOClient(this.state.endpoint);
    socket.on('get films', (films) => {
      const result = Object.keys(films).map(function(key) {
        return [Number(key), films[key]];
      });
      console.log(result);
      this.setState({ films: result });
    });
  }

  render() {
    const films = this.state.films;
    console.log(films);
    return (
      <div className={styles.App}>
        <Header films={films}/>
      </div>
    );
  }
}

export default App;
