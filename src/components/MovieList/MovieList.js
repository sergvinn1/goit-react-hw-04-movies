import { NavLink, withRouter } from 'react-router-dom';
import routes from '../../routes';
import s from '../MovieList/MovieList.module.css';

const MovieList = ({ movies, location }) => (
  <ul className={s.movieList}>
    {movies.length > 0
      ? movies.map(({ id, name, title }) => (
          <li key={id} className={s.movieListItem}>
            <NavLink
              className={s.movieListLink}
              to={{
                pathname: `${routes.movies}/${id}`,
                state: {
                  from: location,
                },
              }}
            >
              {title !== undefined ? title : name}
            </NavLink>
          </li>
        ))
      : 'Look for a movie'}
  </ul>
);

export default withRouter(MovieList);
