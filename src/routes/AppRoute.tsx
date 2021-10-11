import * as React from 'react';
import { Route } from 'react-router-dom';

interface IProps {
    component: any;
    path: string;
}

const AppRoute: React.FC<IProps> = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        exact
        render={(props: React.ComponentProps<any>) => <Component {...props} />}
    />
);

AppRoute.displayName = 'AppRoute';

export default AppRoute;
