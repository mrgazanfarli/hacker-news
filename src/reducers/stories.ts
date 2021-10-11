import StoriesActions from 'actions/stories/consts';
import { generateAsyncItemReducer } from 'utils/redux';
import { IStory } from 'services/stories/models';

export const storyIds = generateAsyncItemReducer<number[]>(StoriesActions.GET_STORY_IDS);
export const stories = generateAsyncItemReducer<IStory[]>(StoriesActions.GET_STORIES);
