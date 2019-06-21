import React, {Component} from 'react';
import Header from '../Header';
import styles from './styles.module.scss';
import axios from 'axios';

class App extends Component {
  state = {
    films: [],
  };

  async componentDidMount() {
    const response = await axios.get(`https://swapi.co/api/films/`);
    const films = [];

    for (let film of response.data.results) {
      films.push(film.title);
    }

    this.setState({ films: films });
  }

  render() {
    const films = this.state.films;

    return (
      <div className={styles.App}>
        <Header films={films} />
      </div>
    );
  }
}

export default App;
