import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { ICollection } from '../../types/Collection.type';
import type {
    IInstance,
    IInstanceAttributes,
} from '../../types/Instance.types';

/**
 * Redux state key for 'instance'
 * @category Redux
 * @subcategory Budget Slice
 */
export interface IInstanceState {
    collections: ICollection[];
    error: boolean;
    instances: IInstance[];
    loaded: boolean;
    loading: boolean;
    orgNames: Record<string, string>;
    timestamp: number;
}

const initialState: IInstanceState = {
    collections: [],
    error: false,
    instances: [],
    loaded: false,
    loading: false,
    orgNames: {},
    timestamp: 0,
};

const orderInstancesById = (instances: IInstance[]) => {
    const instancesById = instances.reduce(
        (acc: Record<string, IInstance>, instance) => {
            acc[instance.pcfGuid] = {
                ...instance,
                flash: instance.flash,
                received: Date.now(),
            };
            return acc;
        },
        {},
    );
    return instancesById;
};

export const instanceSlice = createSlice({
    name: 'instance',
    initialState,
    reducers: {
        clearFlash(state, { payload }: PayloadAction<{ pcfGuid: string }>) {
            state.instances = state.instances.map((instance) => {
                if (instance.pcfGuid === payload.pcfGuid) {
                    return { ...instance, flash: false };
                }
                return instance;
            });
        },
        instancesError(state) {
            state.loading = false;
            state.error = true;
        },
        instancesLoading(state) {
            state.loaded = false;
            state.loading = true;
            state.error = false;
        },
        updateInstance(
            state,
            { payload }: PayloadAction<{ instance: IInstance }>,
        ) {
            state.instances = state.instances.map((instance) => {
                if (instance.pcfGuid === payload.instance.pcfGuid) {
                    if (payload.instance.status !== instance.status) {
                        return {
                            ...payload.instance,
                            flash: true,
                            received: Date.now(),
                        };
                    }
                    return {
                        ...payload.instance,
                        flash: instance.flash,
                        received: Date.now(),
                    };
                }
                return { ...instance, flash: instance.flash };
            });
        },
        updateMultipleInstances(
            state,
            { payload }: PayloadAction<{ instances: IInstance[] }>,
        ) {
            const instancesById = orderInstancesById(payload.instances);

            state.instances = state.instances.map((instance) => {
                if (instance.pcfGuid in instancesById) {
                    if (
                        instance.status !==
                        instancesById[instance.pcfGuid].status
                    ) {
                        return {
                            ...instancesById[instance.pcfGuid],
                            flash: true,
                        };
                    }
                    return {
                        ...instancesById[instance.pcfGuid],
                        flash: instance.flash,
                    };
                }
                return { ...instance, flash: instance.flash };
            });
        },
        updateUserOverrides(
            state,
            { payload }: PayloadAction<{ userOverrides: IInstanceAttributes }>,
        ) {
            state.instances = state.instances.map((instance) => {
                if (instance.pcfGuid === payload.userOverrides.pcfGuid) {
                    return {
                        ...instance,
                        userOverrides: payload.userOverrides,
                    };
                }
                return instance;
            });
        },
        writeAllInstances(
            state,
            {
                payload,
            }: PayloadAction<{
                instances: IInstance[];
                collections: ICollection[];
            }>,
        ) {
            const instancesById = orderInstancesById(state.instances);
            state.instances = payload.instances.map((instance) => {
                if (instance.pcfGuid in instancesById) {
                    if (
                        instance.status !==
                        instancesById[instance.pcfGuid].status
                    ) {
                        return {
                            ...instance,
                            flash: true,
                            received: Date.now(),
                        };
                    }
                }
                return {
                    ...instance,
                    received: Date.now(),
                };
            });
            state.loaded = true;
            state.loading = false;
            state.error = false;
            state.timestamp = Date.now();
        },
        writeOrgIds(
            state,
            {
                payload,
            }: PayloadAction<{ orgNames: IInstanceState['orgNames'] }>,
        ) {
            state.orgNames = payload.orgNames;
        },
    },
});

export const {
    clearFlash,
    instancesError,
    instancesLoading,
    updateInstance,
    updateMultipleInstances,
    updateUserOverrides,
    writeAllInstances,
    writeOrgIds,
} = instanceSlice.actions;

export default instanceSlice.reducer;
