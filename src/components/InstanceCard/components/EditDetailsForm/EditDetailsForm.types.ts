import type { IInstance } from '../../../../types/Instance.types';

export interface IProps {
    instance: IInstance;
    onCancel: () => void;
}
