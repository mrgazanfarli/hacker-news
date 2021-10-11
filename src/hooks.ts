import { IAsyncData } from 'models';
import { initialAsyncData } from 'consts';
import React from 'react';
import { ERequestStatus } from 'models/enums';

export function useAsyncData<T>(
    initAsyncData: IAsyncData<any> = { ...initialAsyncData },
): [IAsyncData<T>, (service: () => Promise<T>) => Promise<T>, () => void] {
    const [asyncData, setAsyncData] = React.useState<IAsyncData<T>>(initAsyncData);

    function makeRequest(service: () => Promise<T>): Promise<T> {
        setAsyncData((x) => ({ ...x, status: ERequestStatus.PENDING }));
        return service()
            .then((data) => {
                setAsyncData((x) => ({ ...x, data, status: ERequestStatus.SUCCESS }));
                return data;
            })
            .catch((error) => {
                setAsyncData((x) => ({ ...x, error, status: ERequestStatus.ERROR }));
                throw error;
            });
    }

    function reset(): void {
        setAsyncData({ ...initialAsyncData });
    }

    return [asyncData, makeRequest, reset];
}
