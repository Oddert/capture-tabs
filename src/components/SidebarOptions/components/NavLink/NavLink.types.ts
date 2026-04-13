import type { INavigationOption } from '../../../../constants/routerConstants';

export interface IProps {
    navItem: INavigationOption;
    isChild?: boolean;
    onClose: (args?: unknown) => void;
    open: boolean;
    permanent?: boolean;
}
