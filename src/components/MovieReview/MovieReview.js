import { Component } from 'react';
import moviesAPI from '../../services/moviesAPI';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import s from './MovieReview.module.css';

class MovieReview extends Component {
  state = {
    reviews: [],
  };

  async componentDidMount() {
    const filmID = this.props.match.params.movieId;
    moviesAPI.fetchMovieReview(filmID).then(results =>
      this.setState({
        reviews: results,
      }),
    );
  }

  render() {
    const { reviews } = this.state;

    return (
      <div>
        <ul className={s.movieReviewsList}>
          {reviews &&
            reviews.map(review => (
              <li key={review.id}>
                <p className={s.movieReviewsListName}>
                  Author: {review.author}
                </p>
                <p className={s.movieReviewsListText}>{review.content}</p>
              </li>
            ))}
          {reviews.length === 0 && 'There are no reviews'}
        </ul>
      </div>
    );
  }
}
MovieReview.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.shape({ movieId: PropTypes.string }),
    path: PropTypes.string,
    url: PropTypes.string,
  }),
};

export default withRouter(MovieReview);
