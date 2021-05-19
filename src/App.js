import { Route, Switch } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import AppBar from './components/AppBar/AppBar';
import s from './styles.css';
import routes from './routes';

const HomeView = lazy(() =>
  import('./views/HomePage'),
);
const MovieView = lazy(() =>
  import('./views/MoviesPage'),
);
const MovieDetailsView = lazy(
  () =>
    import('./views/MovieDetails'),
);
const NotFoundPage = lazy(() =>
  import('./views/NotFoundPage'),
);

const App = () => (
  <>
    <AppBar />
    <div className={s.container}>
      <Suspense fallback={<h1>Loading...Please wait...</h1>}>
        <Switch>
          <Route exact path={routes.home} component={HomeView} />
          <Route path={routes.movieDetails} component={MovieDetailsView} />
          <Route path={routes.movies} component={MovieView} />
          <Route exact path="/goit-react-hw-04-movies" component={HomeView} />
          <Route component={NotFoundPage} />
        </Switch>
      </Suspense>
    </div>
  </>
);

export default App;
