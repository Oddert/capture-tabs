export interface IInstance {
    contactInfo: string;
    createdAt: number;
    flash?: boolean;
    instanceId: string;
    message: string;
    pcfAppName: string;
    pcfCpu: number;
    pcfInstancesTotal: number;
    pcfGuid: string;
    pcfOrganisationId: string;
    pcfRam: number;
    pcfSpaceId: string;
    readableName: string;
    received?: number;
    status: string;
    tickOverride: number;
    updatedAt: number;
    userOverrides?: IInstanceAttributes;
}

export interface IInstanceAttributes {
    description: string | null;
    instanceAttrId: string;
    pcfGuid: string;
    readableName: string | null;
}

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export interface IInstanceExtended extends IInstance {
    [key: string]: unknown;
}

export interface ISortedInstances {
    highlighted: IInstance[];
    other: IInstance[];
}

export interface ITask {
    guid: string;
    sequence_id: number;
    name: string;
    state: string;
    memory_in_mb: number;
    disk_in_mb: number;
    result: { failure_reason: string | null };
    droplet_guid: string;
    created_at: string;
    updated_at: string;
    links: {
        self: {
            href: string;
        };
        app: {
            href: string;
        };
        droplet: {
            href: string;
        };
    };
}

export interface ITaskResponse {
    pagination: {
        total_results: number;
        total_pages: number;
        first: {
            href: string;
        };
        last: {
            href: string;
        };
        next: {
            href: string | null;
        };
        previous: string | null;
    };
    resources: ITask[];
}
