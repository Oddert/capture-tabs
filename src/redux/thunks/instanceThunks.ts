import type { IInstance } from '../../types/Instance.types';
import type { AppDispatch } from '../constants/store';

import InstanceService from '../../services/instance.service';
import { createInstance } from '../../utils/factories';
import {
    instancesError,
    instancesLoading,
    updateMultipleInstances,
    writeAllInstances,
    writeOrgIds,
} from '../slices/instanceSlice';

import { intakeError } from './errorThunks';

/**
 * Performs a full load for all user's watchlist instances.
 * @category Redux
 * @subcategory Thunks
 */
export const fetchAllInstances = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(instancesLoading());
        const response = await InstanceService.allInstances();
        if (response.status === 200) {
            dispatch(
                writeAllInstances({
                    instances: response.instances,
                    collections: [],
                }),
            );
        }
    } catch (error) {
        dispatch(instancesError());
        dispatch(intakeError(error));
    }
};

/**
 * Loads the mapping of organisation IDs to names.
 * @category Redux
 * @subcategory Thunks
 */
export const fetchOrgNames = () => async (dispatch: AppDispatch) => {
    try {
        const response = await InstanceService.orgMapping();
        if (response.status === 200) {
            dispatch(writeOrgIds({ orgNames: response.orgNames }));
        }
    } catch (error) {
        dispatch(intakeError(error));
    }
};

/**
 * Updates a single Instance from a JSON serialised WebSocket response.
 * @category Redux
 * @subcategory Thunks
 * @param instanceJson The list of Instances in JSON string format. Must resolve to an array of objects.
 */
export const updateFromWS =
    (instanceJson: string) => async (dispatch: AppDispatch) => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
            const obj: any = JSON.parse(instanceJson);
            const instances: IInstance[] = [];
            if (Array.isArray(obj)) {
                for (const incomingInstance of obj) {
                    const instance: IInstance = { ...createInstance() };
                    if (typeof incomingInstance === 'object') {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                        const keys = Object.keys(incomingInstance);
                        keys.forEach((key) => {
                            if (key in incomingInstance) {
                                // @ts-expect-error idk how to resolve this one
                                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                                instance[key] = incomingInstance[key];
                            }
                        });
                    } else {
                        throw TypeError(
                            'Array item from the JSON websocket response is not a valid Instance object.',
                            { cause: JSON.stringify(incomingInstance) },
                        );
                    }
                    instances.push(instance);
                }
            } else {
                throw TypeError(
                    'JSON response from the websocket connection is not a valid Array.',
                    { cause: instanceJson },
                );
            }
            dispatch(updateMultipleInstances({ instances }));
        } catch (error) {
            dispatch(intakeError(error));
        }
    };
