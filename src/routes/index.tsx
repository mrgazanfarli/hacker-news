import * as React from 'react';

import { IRoute } from 'models';
import { ROUTES } from 'routes/consts';

// Stories page
const StoriesPage = React.lazy(() => import('pages/Stories'));

export const routes: IRoute[] = [
    { path: ROUTES.STORIES.PATH, component: StoriesPage }
];
