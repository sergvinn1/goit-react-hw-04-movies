import { Component } from 'react';
import moviesAPI from '../services/moviesAPI';
import SearchForm from '../components/SearchForm';
import MovieList from '../components/MovieList';

class MoviesPage extends Component {
  state = {
    movies: [],
  };

  componentDidMount() {}

  componentDidUpdate(prevState) {
    if (prevState.movies !== this.state.movies) {
      localStorage.setItem('Movies Search', JSON.stringify(this.state.movies));
    }
  }

  handleFormSubmit = query => {
    this.getMovies(query);
  };

  getMovies = query => {
    moviesAPI.fetchMoviesSearch(query).then(results =>
      this.setState({
        movies: [...results],
      }),
    );
  };

  render() {
    const { movies } = this.state;
    return (
      <div>
        <SearchForm onSubmit={this.handleFormSubmit} />
        <MovieList movies={movies} />
      </div>
    );
  }
}

export default MoviesPage;
