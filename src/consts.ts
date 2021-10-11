import { IAsyncData } from 'models';
import { ERequestStatus } from 'models/enums';

export const initialAsyncData: IAsyncData<any> = {
    data: null,
    error: null,
    status: ERequestStatus.IDLE,
};
