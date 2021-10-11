import { ERequestStatus } from 'models/enums';
import { Maybe } from 'models/types';
import { IStory } from 'services/stories/models';

export interface Action<T = any> {
    type: T
}

export interface ICustomAction<P> {
    payload?: P;
    type: string;
}

export interface AnyAction extends Action {
    // Allows any extra properties to be defined in an action.
    [extraProps: string]: any
}

export interface IAsyncDataBase {
    error: Maybe<IError>;
    status: ERequestStatus;
}

export interface IAsyncData<T> extends IAsyncDataBase {
    data: Maybe<T>;
}

export interface IAppState {
    storyIds: IAsyncData<number[]>;
    stories: IAsyncData<IStory[]>;
}

export interface IRoute {
    component: any;
    path: string;
}

export interface IError {
    code?: string;
    httpCode?: number;
    error?: boolean;
    message?: string;
    request?: any;
}
