import { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import moviesAPI from '../services/moviesAPI';
import imagePlacer from '../ImagePlacer.jpg';

import s from'../views/MovieDetails.module.css';
import routes from '../routes';

const reviewComponent = lazy(() =>
  import(
    '../components/MovieReview' 
  ),
);
const castComponent = lazy(() =>
  import(
    '../components/MovieCast' 
  ),
);

const imagesUrl = 'https://image.tmdb.org/t/p/w500';

class MovieDetails extends Component {
  state = {
    title: null,
    release_date: '',
    vote_average: null,
    overview: null,
    genres: [],
    poster_path: null,
  };
  async componentDidMount() {
    const filmID = this.props.match.params.movieId;
    moviesAPI
      .fetchDetails(filmID)
      .then(
        ({
          title,
          release_date,
          vote_average,
          overview,
          genres,
          poster_path,
        }) =>
          this.setState({
            title,
            release_date,
            vote_average,
            overview,
            genres,
            poster_path,
          }),
      );
  }
  handleGoBack = () => {
    const { location, history } = this.props;
    if (location.state && location.state.from) {
      return history.push(location.state.from);
    }
    history.push('/');
  };

  render() {
    const { match } = this.props;

    const {
      title,
      release_date,
      vote_average,
      overview,
      genres,
      poster_path,
    } = this.state;
    const userScore = vote_average * 10;
    const releaseYear = release_date.slice(0, 4);
    return (
      <div className={s.movieDetails}>
        <button
          type="button"
          onClick={this.handleGoBack}
          className={s.movieDetailsButton}
        >
          Go Back
        </button>
        <h1 className={s.title}>
          {title} {releaseYear && <span>({releaseYear})</span>}
        </h1>
        <div className={s.movieDetailsDescription}>
          <div className={s.movieDetailsDescriptionImg}>
            {poster_path ? (
              <img
                src={`${imagesUrl}${poster_path}`}
                alt={title}
                height="500px"
              />
            ) : (
              <img src={imagePlacer} className={s.movieCastImage} alt={title} />
            )}
          </div>
          <div className={s.movieDetailsDescriptionText}>
            <p>User Score: {userScore}%</p>

            {overview && (
              <>
                <h2 className={s.subtitle}>Overview</h2> <p>{overview}</p>
              </>
            )}
            {genres.length > 0 && (
              <>
                {' '}
                <h2 className={s.subtitle}>Genres</h2>
                <p>
                  {genres.map(genre => (
                    <span
                      key={genre.name}
                      className={s.movieDetailsDescriptionTextGenres}
                    >
                      {genre.name}
                    </span>
                  ))}
                </p>
              </>
            )}
          </div>
        </div>
        <h2 className={s.subtitle}>Additional information</h2>

        <NavLink
          to={{
            pathname: `${match.url}${routes.cast}`,
            state: {
              from: this.props.location,
            },
          }}
          className={s.movieDetailsAdditional}
          activeClassName={s.movieDetailsAdditionalActive}
        >
          Cast
        </NavLink>
        <NavLink
          to={{
            pathname: `${match.url}${routes.reviews}`,
            state: {
              from: this.props.location,
            },
          }}
          className={s.movieDetailsAdditional}
          activeClassName={s.movieDetailsAdditionalActive}
        >
          {' '}
          Reviews{' '}
        </NavLink>
        <Suspense fallback={<h2>Loading...</h2>}>
          <Switch>
            <Route
              path={`${match.path}${routes.cast}`}
              component={castComponent}
              onClick={this.handleGoBack}
            />
            <Route
              path={`${match.path}${routes.reviews}`}
              component={reviewComponent}
              onClick={this.handleGoBack}
            />
          </Switch>
        </Suspense>
      </div>
    );
  }
}

export default MovieDetails;
