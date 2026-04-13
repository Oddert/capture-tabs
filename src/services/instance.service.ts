import type {
    IInstance,
    IInstanceAttributes,
    ITaskResponse,
} from '../types/Instance.types';
import type { IStandardResponse } from '../types/Request.types';

import request from '../common/request';

/**
 * Primary interface for interacting with the Instances API.
 *
 * Contains a list of functions for calling endpoints.
 * @category Services
 * @subcategory API Service
 */
const InstanceService = Object.freeze({
    /**
     * Queries all the user's watched instances.
     * @returns The access and refresh tokens or a failed login attempt.
     */
    allInstances: async () => {
        const response: IStandardResponse & {
            instances: IInstance[];
        } = await request.get('/instance');
        return response;
    },

    /**
     * Requests an individual instance by PCF GUID.
     * @param pcfGuid The PCF ID being requested.
     * @returns The instance.
     */
    instanceByPcfGuid: async (pcfGuid: string) => {
        const response: IStandardResponse & {
            instance: IInstance;
        } = await request.get(`/instance/pcf-id/${pcfGuid}`);
        return response;
    },

    /**
     * Gets a mapping of all PCF organisation IDs to readable names.
     * @returns
     */
    orgMapping: async () => {
        const response: IStandardResponse & {
            orgNames: Record<string, string>;
        } = await request.get('/instance/org-names');
        return response;
    },

    /**
     * Proxies a request to the PCF API to get a list of recent 'tasks' for an instance (if any exist).
     *
     * Tasks can be thought of like events, describing an action taken on PCF manually or automatically.
     * @param pcfGuid The PCF ID to query for.
     * @returns The response from the PCF API with a list of tasks.
     */
    taskListByGuid: async (pcfGuid: string) => {
        const response: IStandardResponse & { tasks: ITaskResponse } =
            await request.get(`/instance/tasks/pcf-id/${pcfGuid}`);
        return response;
    },

    /**
     * Allows users to optionally override display parameters for Instances.
     * @param pcfGuid The PCF GUID to assign overrides to.
     * @param payload Optional 'readable name' and 'description' to update.
     * @returns The updated overrides.
     */
    updateUserOverrides: async (
        pcfGuid: string,
        payload: {
            description?: string | null;
            readableName?: string | null;
        },
    ) => {
        const response: IStandardResponse & {
            instanceAttributes: IInstanceAttributes;
        } = await request.put(`/instance/user-overrides/${pcfGuid}`, payload);
        return response;
    },

    /**
     * For demo purposes.
     *
     * Allows you to manually push a status to an instance.
     * @param pcfGuid The Instance to alter.
     * @param action The new status to push.
     */
    demoRoute: async (pcfGuid: string, action: string) => {
        const response: IStandardResponse = await request.put(
            `/instance/demo/${pcfGuid}/${action}`,
        );
        return response;
    },
});

export default InstanceService;
