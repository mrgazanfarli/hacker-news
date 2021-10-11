import StoriesServices from 'services/stories';
import { EStoryType } from 'models/enums';
import store from 'store';

import StoriesActions from './consts';

export const getStories = (limit, page): any => {
    return {
        payload: Promise.all(store.getState().storyIds.data?.slice(limit * (page - 1), limit * page)?.map(id => StoriesServices.getStory(id))),
        type: StoriesActions.GET_STORIES,
    }
}

export const getStoryIds = (storyType: EStoryType): any => {
    return {
        payload: StoriesServices.getStoryIds(storyType),
        type: StoriesActions.GET_STORY_IDS,
    }
}
