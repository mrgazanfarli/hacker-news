import { httpClient } from 'dependencies';
import { IError } from 'models';

export const getRequest = httpClient.get;
export const putRequest = httpClient.put;
export const postRequest = httpClient.post;
export const delRequest = httpClient.delete;
export const patchRequest = httpClient.patch;

export const isNotFoundError = (error: IError) => error.httpCode === 404;

export const isServerError = (error: IError) => `${error.httpCode}`.startsWith('5');
