import React from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import { routes } from 'routes';

import LoadingSpinner from 'components/Loading';
import AppRoute from 'routes/AppRoute';

const App: React.FC = () => {
  return (
      <Router>
        <React.Suspense
            fallback={(
                <div className="pt-3">
                  <LoadingSpinner />
                </div>
            )}
        >
          <Switch>
            {routes.map((route, idx) => (
                <AppRoute
                    path={route.path}
                    component={route.component}
                    key={idx}
                />
            ))}

            <Redirect from="*" to="/stories/new" />
          </Switch>
        </React.Suspense>
      </Router>
  );
};

App.displayName = 'App';

export default App;
