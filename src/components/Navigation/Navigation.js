import routes from '../../routes';
import { NavLink } from 'react-router-dom';
import s from '../Navigation/Navigation.module.css';
const Navigation = () => (
  <nav>
    <ul className={s.NavigationList}>
      <li className={s.NavigationListItem}>
        {' '}
        <NavLink
          exact
          to={routes.home}
          className={s.NavigationListLink}
          activeClassName={s.NavigationListActiveLink}
        >
          Home
        </NavLink>
      </li>
      <li className={s.NavigationListItem}>
        {' '}
        <NavLink
          to={routes.movies}
          className={s.NavigationListLink}
          activeClassName={s.NavigationListActiveLink}
        >
          Movies
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Navigation;
