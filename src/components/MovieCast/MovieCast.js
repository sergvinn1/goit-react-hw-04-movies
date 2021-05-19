import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import moviesAPI from '../../services/moviesAPI';
import PropTypes from 'prop-types';
import imagePlacer from '../../ImagePlacer.jpg';
import s from '../MovieCast/MovieCast.module.css';

const imagesUrl = 'https://image.tmdb.org/t/p/w500';

class MovieCast extends Component {
  state = {
    casts: [],
  };
  async componentDidMount() {
    const filmID = this.props.match.params.movieId;
    moviesAPI.fetchMovieCast(filmID).then(cast =>
      this.setState({
        casts: cast,
      }),
    );
  }

  render() {
    const { casts } = this.state;
    return (
      <div>
        <ul className={s.movieCast}>
          {casts &&
            casts.map(({ cast_id, profile_path, name, character }) => (
              <li className={s.movieCastItem} key={cast_id}>
                {profile_path ? (
                  <img
                    src={`${imagesUrl}${profile_path}`}
                    alt={name}
                    className={s.movieCastImage}
                  />
                ) : (
                  <img
                    src={imagePlacer}
                    className={s.movieCastImage}
                    alt={name}
                  />
                )}

                <p className={s.movieCastItemName}>{name}</p>

                <p>
                  Character:
                  <br />
                  <span> {character}</span>
                </p>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}
MovieCast.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.shape({ movieId: PropTypes.string }),
    path: PropTypes.string,
    url: PropTypes.string,
  }),
};

export default withRouter(MovieCast);
