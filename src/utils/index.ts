// Promise type guard
import { Maybe } from 'models/types';

import { IError } from 'models';

export function isPromise<T = any> (value: any): value is PromiseLike<T> {
    return value && typeof value.then === 'function';
}

export function isError (obj: any): obj is IError {
    return Boolean(obj) && (obj as IError).error === true;
}

export const isServerError = (error: Maybe<IError>) => `${error?.httpCode}`.startsWith('5');

export const getURLParam = (param: string, location: any): any => {
    return new URLSearchParams(location.search).get(param);
};

export const hasEnumValue = (enumToCheck, value: any) => {
    return (Object as any).values(enumToCheck).includes(value);
}
