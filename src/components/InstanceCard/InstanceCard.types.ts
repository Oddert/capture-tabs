import type { IInstance } from '../../types/Instance.types';
import type { Theme } from '@emotion/react';

export interface IProps {
    instance: IInstance;
}

export interface IStausButtonProps {
    theme: Theme;
    status: IInstance['status'];
}
