import { getRequest } from 'utils/rest';
import { EStoryType } from 'models/enums';
import { IStory } from 'services/stories/models';

const StoriesServices = {
    getStoryIds (storyType: EStoryType): Promise<number[]> {
        return getRequest(`/${storyType}stories.json?print=pretty`)
    },

    getStory (storyId: number): Promise<IStory> {
        return getRequest(`/item/${storyId}.json`);
    }
}

export default StoriesServices;
