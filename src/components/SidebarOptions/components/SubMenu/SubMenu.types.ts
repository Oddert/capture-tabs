import type { INavigationOption } from '../../../../constants/routerConstants';

export interface IProps {
    navItem: INavigationOption;
    onClose: (args?: unknown) => void;
    onOpen: (args?: unknown) => void;
    open: boolean;
    permanent?: boolean;
}
