import React, {Component} from 'react';
import styles from './styles.module.scss';
import Header from '../Header';
import socketIOClient from 'socket.io-client'

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

    socket.on('get films', (movies) => {
      const films = new Map();

      for (let film of movies) {
        films.set(film._id, film.title);
      }

      this.setState({ films: films });
    });
  }

  render() {
    const films = this.state.films;

    return (
      <div className={styles.App}>
        <Header films={films}/>
      </div>
    );
  }
}

export default App;
