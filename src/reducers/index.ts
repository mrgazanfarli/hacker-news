import { combineReducers } from 'redux';

import { IAppState } from 'models';
import { storyIds, stories } from 'reducers/stories';

const rootReducer = combineReducers<IAppState>({
    storyIds,
    stories,
});

export default rootReducer;
