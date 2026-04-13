import type { IInstance } from '../../types/Instance.types';

export interface IProps {
    highlightAlerts?: boolean;
    instances: IInstance[];
    loading: boolean;
}
